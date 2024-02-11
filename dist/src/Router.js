"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Alive_1 = __importDefault(require("./Controllers/Alive"));
const AlagamentosController_1 = __importDefault(require("./Controllers/AlagamentosController"));
const AlagamentosPeriodoController_1 = __importDefault(require("./Controllers/AlagamentosPeriodoController"));
const router = express_1.default.Router();
router.get("/api/v1", Alive_1.default);
router.post("/api/v1/alagamentos/data", AlagamentosController_1.default.execute);
router.post("/api/v1/alagamentos/periodo", AlagamentosPeriodoController_1.default.execute);
exports.default = router;
