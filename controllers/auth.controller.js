import {User} from '../models/user.js'

import { generateToken } from '../utils/generateToken.js';

import { generateRefreshToken } from '../utils/generateToken.js';



export const register = async  (req , res) =>{

    console.log(req.body);

    const {email, password , name , rol , birthday , adress , shopingcar,phone,city} = req.body ;

    try {
        const user  = new User ({email,password,name, rol , birthday , adress , shopingcar,phone,city});
        await user.save();

        const { token, expiresIn } = generateToken(user.id);
        
        generateRefreshToken(user.id, res);
        
        return res.json({ok : true , token , expiresIn})
        
    } catch (error) {
        console.log(error)  
        if(error.code == 11000){
            return res.status(400).json({error:"Correo ya registrado"})
        }
    }
   
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) return res.status(403).json({ error: "No existe este usuario" });

        const respuestaPassword = await user.comparePassword(password);

        if (!respuestaPassword) return res.status(403).json({ error: "Contraseña incorrecta" });

        // Generar el token
        const { token } = generateToken(user.id);

        const rolUser = user.rol ;


        //res.cookie('token',token);
        const idUser = user._id;
       

        // Enviar el token en la respuesta al cliente
        return res.json({ token ,rolUser,idUser });

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
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });

    } catch (error) {
        console.error(error);
        return res.status(500).json({error : "error de server "})
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    localStorage.clear();
    res.json({ ok: true });
};

export const editUser = async (req , res) => {
    try {
        const { id } = req.params;

        const snk = await User.findById(id);

        const { name , birthday, email ,adress ,shopingcar } = req.body;

        console.log("Datos recibidos del cliente:", req.body);

        if (!snk) return res.status(404).json({ error: "No existe el Usuario" });

        await snk.updateOne({ $set: { name , birthday, email ,adress ,shopingcar } })

        return res.json({ ok: true });

    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
} 

export const getUserI = async (req ,res) => { 
    try {
        const {id} = req.params
        const user = await User.findById(id)
        
        if(!user) return res.status(404).json({error : "id no existente"})

        return res.json({user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Server Error"});
    }
 }


