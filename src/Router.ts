import express, { Router } from "express";
import Alive from "./Controllers/Alive";
import AlagamentosController from "./Controllers/AlagamentosController";

const router: Router = express.Router();

router.get("/api/v1", Alive);
router.post("/api/v1/alagamentos/data", AlagamentosController.execute);
router.post("/api/v1/alagamentos/periodo", AlagamentosController.execute);

export default router;
