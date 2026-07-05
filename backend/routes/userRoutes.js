const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../nodemailer/transporter")
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
        console.log("mail send succesfuuly");
        
         res.status(200).json({
            success:true,
            msg:"login successful ",
            user_data:token
        })
    } catch (error) {
        console.log(error.message);   
    }
    
})

module.exports = router