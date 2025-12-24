import { propEq } from 'ramda';
import { RefElement, isPrimitiveElement, isStringElement, isMemberElement, isElement, IdentityManager, visit, cloneShallow, cloneDeep, toValue } from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, URIFragmentIdentifier } from '@swagger-api/apidom-json-pointer/modern';
import { getNodeType, isReferenceElement, isJSONReferenceElement, isPathItemElement, isReferenceLikeElement, isJSONReferenceLikeElement, keyMap, ReferenceElement, PathItemElement } from '@swagger-api/apidom-ns-openapi-2';
import MaximumDereferenceDepthError from "../../../errors/MaximumDereferenceDepthError.mjs";
import MaximumResolveDepthError from "../../../errors/MaximumResolveDepthError.mjs";
import { AncestorLineage } from "../../util.mjs";
import * as url from "../../../util/url.mjs";
import parse from "../../../parse/index.mjs";
import Reference from "../../../Reference.mjs";
// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = new IdentityManager();

/**
 * Custom mutation replacer.
 * @public
 */
export const mutationReplacer = (newElement, oldElement, key, parent) => {
  if (isMemberElement(parent)) {
    parent.value = newElement; // eslint-disable-line no-param-reassign
  } else if (Array.isArray(parent)) {
    parent[key] = newElement; // eslint-disable-line no-param-reassign
  }
};

/**
 * @public
 */

/**
 * @public
 */
class OpenAPI2DereferenceVisitor {
  indirections;
  namespace;
  reference;
  options;
  ancestors;
  refractCache;
  constructor({
    reference,
    namespace,
    options,
    indirections = [],
    ancestors = new AncestorLineage(),
    refractCache = new Map()
  }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
  }
  handleDereferenceError(error, refEl) {
    var _this$options$derefer;
    if ((_this$options$derefer = this.options.dereference.dereferenceOpts) !== null && _this$options$derefer !== void 0 && _this$options$derefer.continueOnError) {
      var _this$options$derefer2;
      (_this$options$derefer2 = this.options.dereference.dereferenceOpts) === null || _this$options$derefer2 === void 0 || _this$options$derefer2.errors.push({
        error,
        refEl
      });
      return undefined;
    }
    throw error;
  }
  getNestedVisitorOptions(referencingElement) {
    var _this$options$derefer3, _this$options$derefer4;
    return {
      ...this.options,
      resolve: {
        ...this.options.resolve,
        external: (_this$options$derefer3 = this.options.dereference) !== null && _this$options$derefer3 !== void 0 && (_this$options$derefer3 = _this$options$derefer3.dereferenceOpts) !== null && _this$options$derefer3 !== void 0 && _this$options$derefer3.skipNestedExternal && toValue(referencingElement.get('$ref')).startsWith('#') ? false : this.options.resolve.external
      },
      dereference: {
        ...this.options.dereference,
        dereferenceOpts: {
          ...((_this$options$derefer4 = this.options.dereference) === null || _this$options$derefer4 === void 0 ? void 0 : _this$options$derefer4.dereferenceOpts),
          continueOnError: false
        }
      }
    };
  }
  toBaseURI(uri) {
    return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
  }
  async toReference(uri) {
    // detect maximum depth of resolution
    if (this.reference.depth >= this.options.resolve.maxDepth) {
      throw new MaximumResolveDepthError(`Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`);
    }
    const baseURI = this.toBaseURI(uri);
    const {
      refSet
    } = this.reference;

    // we've already processed this Reference in past
    if (refSet.has(baseURI)) {
      return refSet.find(propEq(baseURI, 'uri'));
    }
    const parseResult = await parse(url.unsanitize(baseURI), {
      ...this.options,
      parse: {
        ...this.options.parse,
        mediaType: 'text/plain'
      }
    });

    // register new mutable reference with a refSet
    const mutableReference = new Reference({
      uri: baseURI,
      value: cloneDeep(parseResult),
      depth: this.reference.depth + 1
    });
    refSet.add(mutableReference);
    if (this.options.dereference.immutable) {
      // register new immutable reference with a refSet
      const immutableReference = new Reference({
        uri: `immutable://${baseURI}`,
        value: parseResult,
        depth: this.reference.depth + 1
      });
      refSet.add(immutableReference);
    }
    return mutableReference;
  }
  toAncestorLineage(ancestors) {
    /**
     * Compute full ancestors lineage.
     * Ancestors are flatten to unwrap all Element instances.
     */
    const directAncestors = new Set(ancestors.filter(isElement));
    const ancestorsLineage = new AncestorLineage(...this.ancestors, directAncestors);
    return [ancestorsLineage, directAncestors];
  }
  async ReferenceElement(referencingElement, key, parent, path, ancestors, link) {
    var _this$options$derefer7;
    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }
    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);
    const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
    const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Reference Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this reference element and all it's child elements
      return false;
    }
    // ignore resolving external Reference Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this reference element and all it's child elements
      return false;
    }
    let reference;
    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement);
    }
    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));
    this.indirections.push(referencingElement);
    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);
    let referencedElement;
    try {
      // possibly non-semantic fragment
      referencedElement = evaluate(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }
    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (isPrimitiveElement(referencedElement)) {
      const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));
      const cacheKey = `${referencedElementType}-${toValue(identityManager.identify(referencedElement))}`;
      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey);
      } else if (isReferenceLikeElement(referencedElement)) {
        // handling indirect references
        referencedElement = ReferenceElement.refract(referencedElement);
        referencedElement.setMetaProperty('referenced-element', referencedElementType);
        this.refractCache.set(cacheKey, referencedElement);
      } else {
        // handling direct references
        const ElementClass = this.namespace.getElementClass(referencedElementType);
        referencedElement = ElementClass.refract(referencedElement);
        this.refractCache.set(cacheKey, referencedElement);
      }
    }

    // detect direct or circular reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Reference Object detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(`Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`);
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet.circular = true;
      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }
      if (this.options.dereference.circular === 'replace') {
        var _this$options$derefer5, _this$options$derefer6;
        const refElement = new RefElement(referencedElement.id, {
          type: 'reference',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref)
        });
        const replacer = (_this$options$derefer5 = (_this$options$derefer6 = this.options.dereference.strategyOpts['openapi-2']) === null || _this$options$derefer6 === void 0 ? void 0 : _this$options$derefer6.circularReplacer) !== null && _this$options$derefer5 !== void 0 ? _this$options$derefer5 : this.options.dereference.circularReplacer;
        const replacement = replacer(refElement);
        link.replaceWith(replacement, mutationReplacer);
        return !parent ? replacement : false;
      }
    }

    /**
     * Dive deep into the fragment.
     *
     * Cases to consider:
     *  1. We're crossing document boundary
     *  2. Fragment is from non-entry document
     *  3. Fragment is a Reference Object. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonEntryDocument = url.stripHash(reference.refSet.rootRef.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if ((isExternalReference || isNonEntryDocument || isReferenceElement(referencedElement) || shouldDetectCircular || (_this$options$derefer7 = this.options.dereference.dereferenceOpts) !== null && _this$options$derefer7 !== void 0 && _this$options$derefer7.continueOnError) && !ancestorsLineage.includesCycle(referencedElement)) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      const visitor = new OpenAPI2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }
    this.indirections.pop();

    /**
     * Creating a new version of referenced element to avoid modifying the original one.
     */
    const mergedElement = cloneShallow(referencedElement);
    // assign unique id to merged element
    mergedElement.setMetaProperty('id', identityManager.generateId());
    // annotate referenced element with info about original referencing element
    mergedElement.setMetaProperty('ref-fields', {
      // @ts-ignore
      $ref: toValue(referencingElement.$ref)
    });
    // annotate fragment with info about origin
    mergedElement.setMetaProperty('ref-origin', reference.uri);
    // annotate fragment with info about referencing element
    mergedElement.setMetaProperty('ref-referencing-element-id', cloneDeep(identityManager.identify(referencingElement)));

    /**
     * Transclude referencing element with merged referenced element.
     */
    link.replaceWith(mergedElement, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? mergedElement : false;
  }
  async PathItemElement(referencingElement, key, parent, path, ancestors, link) {
    var _this$options$derefer0;
    // ignore PathItemElement without $ref field
    if (!isStringElement(referencingElement.$ref)) {
      return undefined;
    }

    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }
    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);
    const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
    const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Path Item Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }
    // ignore resolving external Path Item Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }
    let reference;
    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement);
    }
    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));
    this.indirections.push(referencingElement);
    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);
    let referencedElement;
    try {
      // possibly non-semantic referenced element
      referencedElement = evaluate(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }
    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (isPrimitiveElement(referencedElement)) {
      const cacheKey = `pathItem-${toValue(identityManager.identify(referencedElement))}`;
      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey);
      } else {
        referencedElement = PathItemElement.refract(referencedElement);
        this.refractCache.set(cacheKey, referencedElement);
      }
    }

    // detect direct or indirect reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Path Item Object reference detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(`Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`);
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet.circular = true;
      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }
      if (this.options.dereference.circular === 'replace') {
        var _this$options$derefer8, _this$options$derefer9;
        const refElement = new RefElement(referencedElement.id, {
          type: 'path-item',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref)
        });
        const replacer = (_this$options$derefer8 = (_this$options$derefer9 = this.options.dereference.strategyOpts['openapi-2']) === null || _this$options$derefer9 === void 0 ? void 0 : _this$options$derefer9.circularReplacer) !== null && _this$options$derefer8 !== void 0 ? _this$options$derefer8 : this.options.dereference.circularReplacer;
        const replacement = replacer(refElement);
        link.replaceWith(replacement, mutationReplacer);
        return !parent ? replacement : false;
      }
    }

    /**
     * Dive deep into the fragment.
     *
     * Cases to consider:
     *  1. We're crossing document boundary
     *  2. Fragment is from non-entry document
     *  3. Fragment is a Path Item Object with $ref field. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonEntryDocument = url.stripHash(reference.refSet.rootRef.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if ((isExternalReference || isNonEntryDocument || isPathItemElement(referencedElement) && isStringElement(referencedElement.$ref) || shouldDetectCircular || (_this$options$derefer0 = this.options.dereference.dereferenceOpts) !== null && _this$options$derefer0 !== void 0 && _this$options$derefer0.continueOnError) && !ancestorsLineage.includesCycle(referencedElement)) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      const visitor = new OpenAPI2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }
    this.indirections.pop();

    // merge fields from referenced Path Item with referencing one
    if (isPathItemElement(referencedElement)) {
      const mergedElement = new PathItemElement([...referencedElement.content], cloneDeep(referencedElement.meta), cloneDeep(referencedElement.attributes));
      // assign unique id to merged element
      mergedElement.setMetaProperty('id', identityManager.generateId());
      // existing keywords from referencing PathItemElement overrides ones from referenced element
      referencingElement.forEach((value, keyElement, item) => {
        mergedElement.remove(toValue(keyElement));
        mergedElement.content.push(item);
      });
      mergedElement.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref)
      });
      // annotate referenced element with info about origin
      mergedElement.setMetaProperty('ref-origin', reference.uri);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty('ref-referencing-element-id', cloneDeep(identityManager.identify(referencingElement)));
      referencedElement = mergedElement;
    }

    /**
     * Transclude referencing element with merged referenced element.
     */
    link.replaceWith(referencedElement, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? referencedElement : undefined;
  }
  async JSONReferenceElement(referencingElement, key, parent, path, ancestors, link) {
    var _this$options$derefer11;
    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }
    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);
    const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
    const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
    const isExternalReference = !isInternalReference;

    // ignore resolving internal JSONReference Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this JSONReference element and all it's child elements
      return false;
    }
    // ignore resolving external JSONReference Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this JSONReference element and all it's child elements
      return false;
    }
    let reference;
    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement);
    }
    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));
    this.indirections.push(referencingElement);
    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);
    let referencedElement;
    try {
      // possibly non-semantic fragment
      referencedElement = evaluate(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }
    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (isPrimitiveElement(referencedElement)) {
      const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));
      const cacheKey = `path-item-${toValue(identityManager.identify(referencedElement))}`;
      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey);
      } else if (isJSONReferenceLikeElement(referencedElement)) {
        // handling indirect references
        referencedElement = ReferenceElement.refract(referencedElement);
        referencedElement.setMetaProperty('referenced-element', referencedElementType);
        this.refractCache.set(cacheKey, referencedElement);
      } else {
        // handling direct references
        const ElementClass = this.namespace.getElementClass(referencedElementType);
        referencedElement = ElementClass.refract(referencedElement);
        this.refractCache.set(cacheKey, referencedElement);
      }
    }

    // detect direct or circular reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Reference Object detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(`Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`);
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet.circular = true;
      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }
      if (this.options.dereference.circular === 'replace') {
        var _this$options$derefer1, _this$options$derefer10;
        const refElement = new RefElement(referencedElement.id, {
          type: 'json-reference',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref)
        });
        const replacer = (_this$options$derefer1 = (_this$options$derefer10 = this.options.dereference.strategyOpts['openapi-2']) === null || _this$options$derefer10 === void 0 ? void 0 : _this$options$derefer10.circularReplacer) !== null && _this$options$derefer1 !== void 0 ? _this$options$derefer1 : this.options.dereference.circularReplacer;
        const replacement = replacer(refElement);
        link.replaceWith(replacement, mutationReplacer);
        return !parent ? replacement : false;
      }
    }

    /**
     * Dive deep into the fragment.
     *
     * Cases to consider:
     *  1. We're crossing document boundary
     2. Fragment is from non-entry document
     *  3. Fragment is a JSON Reference Object. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonEntryDocument = url.stripHash(reference.refSet.rootRef.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if ((isExternalReference || isNonEntryDocument || isJSONReferenceElement(referencedElement) || shouldDetectCircular || (_this$options$derefer11 = this.options.dereference.dereferenceOpts) !== null && _this$options$derefer11 !== void 0 && _this$options$derefer11.continueOnError) && !ancestorsLineage.includesCycle(referencedElement)) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      const visitor = new OpenAPI2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement);
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }
    this.indirections.pop();

    /**
     * Creating a new version of referenced element to avoid modifying the original one.
     */
    const mergedElement = cloneShallow(referencedElement);
    // assign unique id to merged element
    mergedElement.setMetaProperty('id', identityManager.generateId());
    // annotate referenced element with info about original referencing element
    mergedElement.setMetaProperty('ref-fields', {
      // @ts-ignore
      $ref: toValue(referencingElement.$ref)
    });
    // annotate fragment with info about origin
    mergedElement.setMetaProperty('ref-origin', reference.uri);
    // annotate fragment with info about referencing element
    mergedElement.setMetaProperty('ref-referencing-element-id', cloneDeep(identityManager.identify(referencingElement)));

    /**
     * Transclude referencing element with merged referenced element.
     */
    link.replaceWith(mergedElement, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? mergedElement : false;
  }
}
export default OpenAPI2DereferenceVisitor;