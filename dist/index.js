"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Router_1 = __importDefault(require("./src/Router"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const SwaggerService_1 = __importDefault(require("./src/Services/Swagger/SwaggerService"));
//Use
app.use('/api/v1/swagger-ui', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(SwaggerService_1.default.toJson()));
app.use(express_1.default.json());
app.use(Router_1.default);
app.listen(port, () => console.log("Connected"));
