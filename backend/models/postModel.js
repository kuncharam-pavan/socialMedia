const mongoose = require("mongoose")
const postSchema =  mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    images:[{type:String,default:""}],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true})
const Post = mongoose.model("Post",postSchema)
module.exports = Post;