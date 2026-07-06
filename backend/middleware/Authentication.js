const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
require("dotenv").config()
exports.Authentication = async(req,res,next)=>{
        try {
            const {authorization} = req.headers
            // console.log(authorization);
            const token  = await authorization.split(" ")[1]
            // console.log(token);
            
            const verify =  await jwt.verify(token,process.env.secreteKey)
            if(!verify){
                return res.send("in valid token ")
            }
            // console.log(verify.id);
            
            
            const user_data = await User.findById(verify.id).select("-createdAt -updatedAt -__v")
            // console.log(user_data);
            
            //   console.log("token verification done");
            req.user = user_data
            next()
            
        } catch (error) {
            return res.status(401).json({
                     success: false,
                     message: error.message
            });
        }
} 
