exports.createPost = async(req,res)=>{
    console.log("create post");
    
    console.log(req.body);
    console.log(req.file);
    
    
    // const {title,description,images,userId,likes,comments} = req.body

}

exports.viewAllPost = async(req,res)=>{
    res.send("view all")
}

exports.viewPost = async(req,res)=>{
    res.send("view post")
}

exports.updatePost = async(req,res)=>{
    res.send("update post")
}


exports.deletePost = async(req,res)=>{
    res.send("delete post")
}