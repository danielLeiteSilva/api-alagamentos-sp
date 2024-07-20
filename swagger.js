const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const doc = {
  info: {
    version: '1.0.0',
    title: 'API Alagamentos em São Paulo',
    description: 'API para obtenção de dados de alagamentos na cidade de São Paulo. Dados obtidos do cgesp.'
  },
  host: 'localhost:8080/api/v1/swagger-ui'
};

const path_file = path.join(__dirname, 'swagger-output.json');

swaggerAutogen(path_file, ['./src/Router.ts'], doc);