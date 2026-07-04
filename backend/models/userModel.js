const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true,minlength:3,maxlength:8},
    profileImage:{type:String,default:""},
    bio:{type:String,default:""},
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    role:{type:String,enum:["user","admin","manager"],default:"user"},
    
},{timestamps:true} )

const User = mongoose.model("User",userSchema)
module.exports = User
