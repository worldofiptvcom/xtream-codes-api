import React from 'react';
import Layout from '@theme/Layout';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage(): JSX.Element {
  return (
    <Layout
      title="API Explorer"
      description="Interactive API documentation with Swagger UI">
      <div className="swagger-ui-wrap">
        <SwaggerUI
          url="/xtream-codes-api/openapi/xtream-codes-api.yaml"
          docExpansion="list"
          defaultModelsExpandDepth={1}
          deepLinking={true}
          displayRequestDuration={true}
          filter={true}
          showExtensions={true}
          showCommonExtensions={true}
        />
      </div>
    </Layout>
  );
}
