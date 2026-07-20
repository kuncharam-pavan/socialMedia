const express = require("express")
const router = express.Router()
const upload = require("../multer/multer")
const {Authentication} = require("../middleware/Authentication")

const {signup,login,updateProfile,deleteProfile,findUser} = require("../controllers/userController")


router.post("/signup",upload.single("profileImage"),signup)

router.post("/login",login)


// -------------update profile,view single profile,delete profile

router.put("/updateProfile/:id",Authentication,updateProfile)


router.delete("/deleteProfile/:id",Authentication,deleteProfile)

router.get("/findUser/:id",Authentication,findUser)





module.exports = router





// const express = require("express");
// const router = express.Router();

// const upload = require("../multer/multer");

// const {
//     uploadImage
// } = require("../controllers/userController");

// router.post(
//     "/upload",
//     upload.single("image"),
//     uploadImage
// );

// module.exports = router;