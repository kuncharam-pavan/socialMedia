const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("i am healthy")
})
app.listen(3000,()=>{console.log("server started for social media")})