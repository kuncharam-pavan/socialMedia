const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    bio:{type:String,default:""},
    profileImage: {type: String,default: ""},
    // this is for storage cloudinary id
    imagePublicId:{type:String,required:true},
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    role:{type:String,enum:["user","admin"],default:"user"},
    
},{timestamps:true} )

const User = mongoose.model("User",userSchema)
module.exports = User


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({

//     name: String,

//     image: String

// });

// module.exports = mongoose.model("User", userSchema);


