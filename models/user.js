import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

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
    },
    rol:{
        type : String,
        required:false
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    try {
        
        const salt = await bcrypt.genSalt(10);

        
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } catch (error) {
        throw new Error('Fallo el hash de la contraseña');
    }
});


userSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password);
};

export const User = mongoose.model('user' , userSchema)
