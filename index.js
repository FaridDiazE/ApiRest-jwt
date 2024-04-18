import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import './database/conectdb.cjs'
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
import sneakerRoutes from './routes/sneaker.route.js'
import salesRoutes from './routes/sales.route.js'
import cors from 'cors'
import {fileURLToPath} from 'url'
import { dirname } from "path"
import path from "path"
const app = express()
const PORT = process.env.PORT || 8000 ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
    origin: '*',
    
}))


app.use(cookieParser());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',authRouter) ;

app.use('/api/v1/sneakers',sneakerRoutes)

app.use('/api/v1/sales',salesRoutes)

app.get('/' , (req,res)=>{
    res.json({ok: true , cambios : 'Iniciado con nuevos cambios'})
});





app.listen(PORT , ()=>console.log("Server is running 👍"));

