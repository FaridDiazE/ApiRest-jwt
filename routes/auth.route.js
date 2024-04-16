import { Router } from 'express';
import { login, refreshToken,register,logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { expressValidation } from '../middlewares/expressValidation.js';
import { infoUser } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { validationBodyLogin, validationBodyRegister } from '../middlewares/validatorManager.js';
import { editUser } from '../controllers/auth.controller.js';
import { accountLimiter } from '../utils/limitRequests.js';
import { getUserI } from '../controllers/auth.controller.js';

const router = Router()


router.post ("/login",validationBodyLogin,expressValidation,login);

router.post ("/register",validationBodyRegister,register);

router.post("/protected" ,requireToken, infoUser);

router.get("/refresh",requireRefreshToken,refreshToken );

router.get("/logout",logout)

router.put("/EditUsr/:id",requireToken,editUser);

router.get("/getUsr/:id",requireToken,getUserI);


export default router ;