require("dotenv").config();

import router from "./Router";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

const app: Express = express();

const port = process.env.PORT || 8080

import SwaggerService from "./Services/Swagger/SwaggerService";

//Use
app.use('/api/v1/swagger-ui', swaggerUi.serve, swaggerUi.setup(SwaggerService.toJson()));

app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Connected"));
