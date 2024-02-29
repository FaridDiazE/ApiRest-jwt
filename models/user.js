import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type : String ,
        required : true
    },
    birthday:{
        type: Date ,
        required: false
    },
    email:{
        type : String ,
        required : true,
        trim : true,
        unique : true,

    },
    password:{
        type:String ,
        required:true
    },
    adress:{
        type:String,
        required:false
    },

    shopingcar:{
        type : Array,
        required: false
    }
});


export const User = model('user' , userSchema)
