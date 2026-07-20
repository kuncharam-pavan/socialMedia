const express = require("express")
const app = express()
require("dotenv").config()

const connectDb = require("./db")
connectDb();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")

// middleware
app.use("/user",userRoutes)
app.use("/post",postRoutes)


app.get("/",(req,res)=>{
    res.send("i am healthy")
})
app.listen(process.env.PORT,()=>{console.log(`server started at ${process.env.PORT}`)})





// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());

// mongoose
// .connect(process.env.mongoUri)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// app.use("/users", require("./routes/userRoutes"));

// app.listen(process.env.PORT, () => {

//     console.log(`Server Running on ${process.env.PORT}`);

// });