// const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

// Swagger setup -> generate manually
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'esma api',
//             description: 'API Documentation using Swagger',
//             contact: {
//                 name: 'datpd@runsystem.net',
//             },
//             servers: ['http://localhost:3500'],
//         },
//     },
//     // Path to the API routes with JSDoc comments
//     apis: [path.join(__dirname, 'routes/*.js')],
// };
// const swaggerSpec = swaggerJsDoc(swaggerOptions); -> gen by manual

// Set up Swagger documentation generation
const outputFile = path.join(__dirname, 'swagger_output.json');
const endpointsFiles = [path.join(__dirname, '../routes/*.js'), path.join(__dirname, '../routes/**/*.js'), path.join(__dirname, './configRoutes.js')];
const doc = {
    info: {
        title: 'XKLD API',
        description: 'Document api',
    },
    host: `${process.env.API_URL}`,
    basePath: '/auth',
    schemes: ['http'],
    securityDefinitions: {
      apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
          description: 'token',
      },
  }
}
// Document
// #swagger.tags = ['Tags'] -> group api
// #swagger.summary = 'Some summary' -> Summary end point
// #swagger.description = 'Some description...' -> Description end point
/* #swagger.parameters['parameterName'] = {
        in: <string>, // 'path', 'header', 'query', 'body', 'formData', etc. // by default is 'query'
        description: <string>, // The parameter description
        required: <boolean>, // true or false
        type: <string>, // type: 'string', 'number', 'boolean', 'integer' or 'array'. // by default is 'string' when 'schema' is missing
        format: <string>, // 'int64', etc.
        schema: <array>, <object> or <string>
} */
module.exports = (app) => {
    // auto gen doc swagger
    app.use('/docs-gen', async (req, res) => {
        swaggerAutogen(outputFile, endpointsFiles, doc);
        return res.json('auto gen successfully');
    });
    app.use('/api-documents', swaggerUi.serve, swaggerUi.setup(require('./swagger_output.json')));
};
