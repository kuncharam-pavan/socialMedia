const nodemailer = require("nodemailer")
require("dotenv").config()

// nodemailer

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        // user:"kuncharampavan2580@gmail.com",
        // pass:"posl chwm kiht ijvs"

        user:process.env.user,
        pass:process.env.pass
    }
})
module.exports = transporter






