import express, { Router } from "express";
import Alive from "./Controllers/Alive";
import AlagamentosController from "./Controllers/AlagamentosController";

const router: Router = express.Router();

router.get("/api/v1", Alive);
router.get("/api/v1/alagamentos", AlagamentosController.execute);

export default router;
