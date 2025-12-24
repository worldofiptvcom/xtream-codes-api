---
sidebar_position: 100
title: OpenAPI Specification
description: Download the OpenAPI 3.0 specification
---

# OpenAPI Specification

The Xtream Codes API is documented using the OpenAPI 3.0 specification. You can use this spec file with tools like Swagger UI, Postman, or code generators.

## Download

- [OpenAPI 3.0 YAML](/openapi/xtream-codes-api.yaml)

## Usage with Swagger UI

```bash
# Start Swagger UI with Docker
docker run -p 8080:8080 -e SWAGGER_JSON=/openapi/xtream-codes-api.yaml -v $(pwd):/openapi swaggerapi/swagger-ui
```

## Usage with Postman

1. Open Postman
2. Click **Import**
3. Select the downloaded YAML file
4. Postman will create a collection with all endpoints

## Code Generation

Generate client libraries using OpenAPI Generator:

```bash
# Install OpenAPI Generator
npm install @openapitools/openapi-generator-cli -g

# Generate Python client
openapi-generator-cli generate -i xtream-codes-api.yaml -g python -o ./python-client

# Generate JavaScript client
openapi-generator-cli generate -i xtream-codes-api.yaml -g javascript -o ./js-client

# Generate PHP client
openapi-generator-cli generate -i xtream-codes-api.yaml -g php -o ./php-client
```

## API Overview

The specification covers:

- **Authentication** - User login and account info
- **Live TV** - Categories and streams
- **VOD** - Movies and categories
- **Series** - TV shows and episodes
- **EPG** - Electronic Program Guide
- **Streaming URLs** - Direct stream access

## Servers

Configure your server URL in the specification:

```yaml
servers:
  - url: http://{server}:{port}
    variables:
      server:
        default: localhost
      port:
        default: "25461"
```
