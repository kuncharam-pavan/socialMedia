const express = require("express")
const router = express.Router()

const {createPost,viewAllPost,viewPost,updatePost,deletePost} = require("../controllers/postController")
router.post("/createPost",createPost)
router.post("/viewAllPost",viewAllPost)
router.post("/viewPost/:id",viewPost)
router.post("/updatePost/:id",updatePost)
router.post("/deletePost/:id",deletePost)




module.exports = router