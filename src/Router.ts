import express, { Router } from "express";
import Alive from "./Controllers/Alive";
import AlagamentosController from "./Controllers/AlagamentosController";
import AlagamentosPeriodoController from "./Controllers/AlagamentosPeriodoController";

const router: Router = express.Router();

router.get("/api/v1", Alive);
router.post("/api/v1/alagamentos/data", AlagamentosController.execute);
router.post("/api/v1/alagamentos/periodo", AlagamentosPeriodoController.execute);

export default router;
