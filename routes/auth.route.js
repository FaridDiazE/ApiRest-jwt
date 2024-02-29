import express from 'express'
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { expressValidation } from '../middlewares/expressValidation.js';

const router = express.Router()


router.post ("/login",[body('email' , "Format is not valid").trim().isEmail().normalizeEmail()],expressValidation,login);

router.post ("/register",[body('email' , "Format is not valid").trim().isEmail().normalizeEmail() , body('password' , "format no valid").trim().isLength({min:6})],expressValidation,register);

export default router ;