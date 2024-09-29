require("dotenv").config()
const mongoose = require("mongoose")

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
        console.log("something is wrong" , error) 
    }
}

module.exports = connectDB;