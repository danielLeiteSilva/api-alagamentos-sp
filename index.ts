require("dotenv").config();

import router from "./src/Router";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

const app: Express = express();

import SwaggerService from "./src/Services/Swagger/SwaggerService";

//Use
// app.use('/api/v1/swagger-ui', swaggerUi.serve, swaggerUi.setup(SwaggerService.toJson()));
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Connected"));
