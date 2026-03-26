import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must have atleast 6 characters",
      });
    }
    const existingUserByEmail = await User.findOne({ email:email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already existed",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email and password",
      });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true,sameSite:"strict"}).json({
        success:true,
        message:`Welcome back ${user.firstName}`,
        user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to login",
    });
  }
};

export const logout = (_,res) =>{
    try {
        return res.status(200).cookie("token", "",{maxAge: 0}).json({
            success:true,
            message:"Logout succeccfully"
        })
    } catch (error) {
        console.log(error)
    }
};

export const updateProfile = async (req,res) => {
  try {
    const userId = req.id;
    const {firstName,lastName,occupation,bio,instagram,facebook,linkedin,github} = req.body;
    const file = req.file;

    // let cloudResponse = null

    // if(file){
    //   const fileUri = getDataUri(file)
    //   cloudResponse = await cloudinary.uploader.upload(fileUri)
    // }
    const fileUri = getDataUri(file);
    let cloudResponse = await cloudinary.uploader.upload(fileUri)

    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"User not found",
        success:false,
      })
    }

    // updating data
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(occupation) user.occupation = occupation
    if(bio) user.bio = bio
    if(instagram) user.instagram = instagram
    if(facebook) user.faceBook = facebook
    if(linkedin) user.linkedIn = linkedin
    if(github) user.gitHub = github
    if(file) user.photoUrl = cloudResponse.secure_url

    await user.save()
    return res.status(200).json({
      message:"Profile updated successfully",
      success:true,
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"failed to update profile",
      success:false,
    })
  }
};