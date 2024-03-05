import mongoose from "mongoose";

const sneakerSchema = mongoose.Schema({
    name:{
        type : String ,
        require : true 
    },
    model:{
        type : String,
        require : true
    },
    size:{
        type : Number,
        require : true
    },
    price:{
        type : Number,
        require:true
    },
    brand:{
        type : String ,
        require:true
    }


})

export const Sneaker = mongoose.model('Snicker' ,sneakerSchema )
