import { Router } from "express";
import { venta } from "../controllers/sales.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { accountLimiter } from '../utils/limitRequests.js';


const router = Router();

router.post('/venta',requireToken,venta, accountLimiter)

export default router ;