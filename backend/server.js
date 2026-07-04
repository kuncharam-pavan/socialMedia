const express = require("express")
const app = express()
require("dotenv").config()

const connectDb = require("./db")
connectDb();

// middleware
app.use(express.json())
app.use(express.urlencoded())



const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")

// middleware
app.use("/user",userRoutes)
app.use("/post",postRoutes)


app.get("/",(req,res)=>{
    res.send("i am healthy")
})
app.listen(process.env.PORT,()=>{console.log(`server started at ${process.env.PORT}`)})