import {User} from '../models/user.js'
import { Sneaker } from '../models/sneakers.js';
import { generateToken } from '../utils/generateToken.js';
import { tokenVerificationErrors } from '../utils/generateToken.js';
import { generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const register = async  (req , res) =>{
    console.log(req.body);
    const {email, password , name} = req.body ;
    try {
        const user  = new User ({email,password,name});
        await user.save();
        return res.json({ok : true})
        
    } catch (error) {
        console.log(error)
        if(error.code == 11000){
            return res.status(400).json({error:"Correo ya registrado"})
        }
    }
   
}

export const login = async (req, res) => {
    try {
        const {email,password} = req.body;

        let user = await User.findOne({ email });

        if (!user)return res.status(403).json({ error: "No existe este usuario" });

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) return res.status(403).json({ error: "Contraseña incorrecta" });

       const { token, expiresIn } = generateToken(user.id);
       generateRefreshToken(user.id, res);

       return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const infoUser = async (req,res) =>{
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({email : user.email , uid : user.id});
    } catch (error) {
        return res.status(500).json({error : "Error de servidor info"})
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) {
            throw new Error("Token de actualización no presente en la cookie");
        }

        const { uid } = await jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        const { token, expiresIn } = generateToken(uid);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'El token de actualización ha expirado' });
        }
        return res.status(401).json({ error: 'Error en la verificación del token de actualización' });
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};


export const createSneaker= async (req , res ) =>{
    console.log(req.body);
    const {name,model,size,price} = req.body ;

    try {
        const sneakers  = new Sneaker({name,model,size,price});
        await sneakers.save();
        return res.json({ok : true})
        
    } catch (error) {
        
    }
}



export const removeSneaker = async (req, res) => {
    
};


