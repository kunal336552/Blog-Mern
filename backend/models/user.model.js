import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:"",
    },
    occupation:{
        type:String,
        default:"",
    },
    photoUrl:{
        type:String,
        default:"",
    },
    instagram:{
        type:String,
        default:"",
    },
    linkedIn:{
        type:String,
        default:"",
    },
    gitHub:{
        type:String,
        default:"",
    },
    faceBook:{
        type:String,
        default:"",
    },

},{timestamps:true})

export const User = mongoose.model("user",userSchema)