const mongoose = require("mongoose")
require("dotenv").config()
const connectDb = async()=>{
    await mongoose.connect(process.env.mongoUri,{dbName:process.env.databaseName})
    console.log("database connected successfully"); 
}
module.exports = connectDb