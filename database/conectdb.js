import mongoose from "mongoose";

mongoose.connect( process.env.MONGODB_URI).then(()=>console.log("Connection to db successful")).catch((error)=>console.error(error));