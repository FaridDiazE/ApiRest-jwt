import jwt from "jsonwebtoken";
import  {tokenVerificationErrors}  from "../utils/generateToken.js";


export const requireRefreshToken = async (req,res,next)=>{
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) {
            throw new Error("Token de actualización no presente en la cookie");
        }

        const { uid } = await jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;

        next();

        
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: tokenVerificationErrors[error.message] });
    }
}