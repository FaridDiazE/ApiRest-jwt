import { Router } from "express";
import { venta } from "../controllers/sales.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post('/venta',requireToken,venta)

export default router ;