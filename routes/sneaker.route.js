import { Router } from "express";
import { creteSnekaer, getSneakers, getSnk, removeSnk, updateSnk } from "../controllers/snaekers.controller.js"; 
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();
import multer from "multer";


const upload = multer({dest:'uploads/'})




router.get('/allProducts',getSneakers)
router.get('/productUnique/:id',requireToken,getSnk)
router.post('/createSnk',requireToken,upload.single('imageIdentify'),creteSnekaer)
router.put('/esditSnk/:id',requireToken,updateSnk)
router.delete('/deleteSnk/:id',requireToken,removeSnk)
export default router ;