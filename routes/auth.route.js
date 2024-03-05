import { Router } from 'express';
import { login, refreshToken,register,createSneaker,removeSneaker,logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { expressValidation } from '../middlewares/expressValidation.js';
import { infoUser } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';






const router = Router()




router.post ("/login",[body('email' , "Format is not valid").trim().isEmail().normalizeEmail()],expressValidation,login);

router.post ("/register",[body('email' , "Format is not valid").trim().isEmail().normalizeEmail() , body('password' , "format no valid").trim().isLength({min:6})],expressValidation,register);

router.post("/protected" ,requireToken, infoUser);

router.get("/refresh",refreshToken );

router.get("/logout",logout)

router.post("/createSneaker",requireToken,createSneaker);

router.delete("/deleteSneaker:id",requireToken,removeSneaker);

export default router ;