import { Router } from "express";
import { creteSnekaer, getSneakers, getSnk, removeSnk, updateSnk } from "../controllers/snaekers.controller.js"; 
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.get('/',requireToken,getSneakers)
router.get('/:id',requireToken,getSnk)
router.post('/createSnk',requireToken,creteSnekaer)
router.put('/esditSnk/:id',requireToken,updateSnk)
router.delete('/deleteSnk/:id',requireToken,removeSnk)
export default router ;