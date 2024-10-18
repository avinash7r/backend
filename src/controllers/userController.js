import mongoose from "mongoose";
import users from "../modules/users.js";

export const createUser=async(req,res)=>{
    const user=req.body;
    if(!user.name || !user.mail || !user.password){
        return console.log("please provide all the fields");
    }
    const newUser=new users(user);
    try {
        await newUser.save();
        return res.status(200).json({success:true,message:"new user created",data:newUser});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}