import { Router } from "express";
import { venta } from "../controllers/sales.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { accountLimiter } from '../utils/limitRequests.js';
import { getVentas } from "../controllers/sales.controller.js";


const router = Router();

router.post('/venta',requireToken,venta,accountLimiter);
router.get('/ventasData', requireToken,getVentas)

export default router ;