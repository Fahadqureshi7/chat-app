const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGODB_URI
async function connectDB() {
    try {
        await mongoose.connect(uri)
        const connection = mongoose.connection

        connection.on('connected' , () => {
            console.log("connect to MongoDB")
        })
        connection.on('error' , ()=>{
            console.log('something is wrong in mongoDB', error);
        })
    } catch (error) {
        console.log("somthing is wrong" , error) 
    }
}

module.exports = connectDB;