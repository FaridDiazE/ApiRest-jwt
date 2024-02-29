import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import './database/conectdb.js'
import authRouter from "./routes/auth.route.js"

const app = express()
const PORT = process.env.PORT || 8000 ;


app.use(express.json());

app.use('/api',authRouter) ;

app.get('/' , (req,res)=>{
    res.json({ok: true})
});





app.listen(PORT , ()=>console.log("Server is running 👍"));

