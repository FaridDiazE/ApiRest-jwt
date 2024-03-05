import { validationResult,body } from "express-validator";


export const expressValidation = (req , res , next) =>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    next()
}


export const validationBodyRegister=[
    body('email' , "Format is not valid").trim().isEmail().normalizeEmail() ,
    body('password' , "format no valid").trim().isLength({min:6}),
    expressValidation
]

export const validationBodyLogin = [body('email' , "Format is not valid").trim().isEmail().normalizeEmail()]

