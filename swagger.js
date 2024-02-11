const swaggerAutogen = require('swagger-autogen')()

swaggerAutogen('./swagger-output.json', ['./dist/src/Router.js']);