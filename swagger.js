const swaggerAutogen = require('swagger-autogen')()

swaggerAutogen('./swagger-output.json', ['./server.js']);