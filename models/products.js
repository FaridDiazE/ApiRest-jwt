import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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
    },
    stock:{
        type : Number,
        require:true
    },
    category : {
        type : String,
        require : true
    },
    imageURL : {
        type : String ,
        require : true
    },
    charasterics : {
        type : String , 
        requiere : true
    },
    materials : {
        type : String ,
        requiere : true 
    }




})

export const Sneaker = mongoose.model('Inventory' ,productSchema )
