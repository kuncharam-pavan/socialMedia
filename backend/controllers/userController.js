

require("dotenv").config()

const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const multer = require("multer")
const transporter = require("../nodemailer/transporter")

// cloudinary 
const cloudinary = require("../cloudinary/cloudinaryConfig")
const fs = require("fs")
const { error } = require("console")



exports.signup = async (req, res) => {
    try {
        // console.log(req.file);
        // console.log(req.body);
        const { name, email, password, bio } = req.body
        const { path } = req.file
        // console.log(path);

        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(409).send("already exists")
        }
        const hashPassword = await bcrypt.hash(password, 12)

      

        // console.log(cloudinary.config());
        // cloudinary
       
      
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "socialmedia"
        })
        
        // console.log(result);
        // console.log(result.secure_url);


        fs.unlink(req.file.path,(error)=>{
            if(error){
                console.log("error for deleting file",error); 
            }
            else{
                console.log("file deleted successfully");
            }
        })



        const data = await User.create({
            name:name,
            email:email,
            password:hashPassword,
            bio:bio,
        //     // for multer
        // //     profileImage: upload.single(profileImage)

        // // for cloudinary
        profileImage: result.secure_url,
        imagePublicId:result.public_id
        })

        
        res.status(200).json({
            success:true,
            msg:"you have register successfully ",
            user_data:data
        })

    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message
        });
    }
        
}

exports.login = async (req, res) => {
    try {

        console.log(req.body);
        
        const { email, password } = req.body


        const data = await User.findOne({ email })
        if (!data) {
            return res.send("signup first")
        }
        const validPass = await bcrypt.compare(password, data.password)
        if (!validPass) {
            return res.send("in valid password")
        }
        const token = await jwt.sign(
            { id: data._id },
            process.env.secreteKey,
            {
                expiresIn: "3h"
            }
        )
        // console.log(token);
        

        // transporter nodemailer
        transporter.sendMail({
            from:"kuncharampavan2580@gmail.com",
            to:data.email,
            subject:"welcome text",
            text:`welcome to the website ${data.name}`
        })
        console.log("mail send successfully");



        res.status(200).json({
            success: true,
            msg: "login successful ",
            user_data: token
        })
    } catch (error) {
        console.log(error.message);
    }

}

exports.updateProfile = async (req, res) => {
    const { id } = req.params


    const { name, email, password, bio,profileImage } = req.body

    const update_data = {

    }
    if (name) {
        update_data.name = name
    }
    if (email) {
        update_data.email = email
    }
    if (password) {
        const updateHashPassword = await bcrypt.hash(password, 12)
        update_data.password = updateHashPassword
    }
    if (bio) {
        update_data.bio = bio
    }
    if(profileImage){
        update_data.profileImage = profileImage
    }
    // if()
    console.log("update data",update_data);

    // const data = await User.findByIdAndUpdate({ _id: id }, update_data, { new: true }).select("-createdAt -updatedAt -__v")
    // res.status(200).json({
    //     success: true,
    //     msg: "updated data successfully",
    //     updated_data: data
    // })
}


exports.deleteProfile = async (req, res) => {
    const { id } = req.params
    const data = await User.findByIdAndDelete(id)
    if (!data) {
        return res.status(400).send("data not found")
    }
    res.status(200).json({
        success: true,
        msg: "deleted successfully",
        data: data
    })
}


exports.findUser = async (req, res) => {
    const { id } = req.params
    const data = await User.findOne({ _id: id })
    res.status(200).json({
        status: true,
        msg: "find user",
        data: data
    })
}




// const User = require("../models/userModel");
// const cloudinary = require("../cloudinary/cloudinaryConfig");
// const fs = require("fs");

// exports.uploadImage = async (req, res) => {

//     try {

//         if (!req.file) {
//             return res.status(400).json({
//                 message: "No File Uploaded"
//             });
//         }

//         // Upload image to Cloudinary

//         // const result = await cloudinary.uploader.upload(req.file.path, {

//         //     folder: "Users"

//         // });

//         const result = await cloudinary.uploader.upload(req.file.path);

//         // Delete local image after successful upload

//         fs.unlink(req.file.path, (err) => {

//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("Local Image Deleted");
//             }

//         });

//         // Save image url into mongodb

//         const user = await User.create({

//             name: req.body.name,

//             image: result.secure_url

//         });

//         res.status(201).json({

//             success: true,

//             message: "Uploaded Successfully",

//             data: user

//         });

//     } catch (error) {

//         // delete local file if upload failed

//         if (req.file) {
//             fs.unlink(req.file.path, () => {});
//         }

//         res.status(500).json({

//             success: false,

//             message: error.message

//         });

//     }

// };