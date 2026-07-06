const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../nodemailer/transporter")
const {Authentication} = require("../middleware/Authentication")
require("dotenv").config()
router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,bio} = req.body
        const findUser = await User.findOne({email})
        if(findUser){
            return res.status(409).send("already exists")
        }
        const hashPassword = await bcrypt.hash(password,12)
        const data = await User.create({
            name:name,
            email:email,
            password:hashPassword,
            bio:bio,
        })
        res.status(200).json({
            success:true,
            msg:"you have register successfully ",
            user_data:data
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/login",async(req,res)=>{
    try {
        
        
        const {email,password} = req.body 
    
        
        const data  = await User.findOne({email})
        if(!data){
            return res.send("signup first")
        }
        const validPass = await bcrypt.compare(password,data.password)
        if(!validPass){
            return res.send("in valid password")
        }
        const token = await jwt.sign(
            {id:data._id},
            process.env.secreteKey,
            {
                expiresIn:"3h"
            }
        )
        transporter.sendMail({
            from:"kuncharampavan2580@gmail.com",
            to:data.email,
            subject:"welcome text",
            text:`welcome to the website ${data.name}`
        })
        // console.log("mail send succesfuuly");
        
         res.status(200).json({
            success:true,
            msg:"login successful ",
            user_data:token
        })
    } catch (error) {
        console.log(error.message);   
    }
    
})


// -------------update profile,view single profile,delete profile

router.put("/updateProfile/:id",Authentication,async(req,res)=>{
    const {id} = req.params
   
    
    const {name,email,password,bio} = req.body

    const update_data ={

    }
    if(name){
        update_data.name = name
    }
    if(email){
        update_data.email = email
    }
    if(password){
        const updateHashPassword = await bcrypt.hash(password,12)
        update_data.password = updateHashPassword
    }
    if(bio){
        update_data.bio  = bio
    }
    // console.log("update data",update_data);
    
    const data = await User.findByIdAndUpdate({_id:id},update_data,{new:true}).select("-createdAt -updatedAt -__v")
    res.status(200).json({
        success:true,
        msg:"updated data successfully",
        updated_data:data
    })
})


router.delete("/deleteProfile/:id",Authentication,async(req,res)=>{
    const {id} = req.params
    const data = await User.findByIdAndDelete(id)
    if(!data){
        return res.status(400).send("data not found")
    }
    res.status(200).json({
        success:true,
        msg:"deleted successfully",
        data:data
    })
})

router.get("/findUser/:id",Authentication,async(req,res)=>{
    const {id} = req.params
    const data = await User.findOne({_id:id})
    res.status(200).json({
        status:true,
        msg:"find user",
        data:data
    })
})





module.exports = router