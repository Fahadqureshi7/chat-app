require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB")
const router = require("./routes/index")
const cookieparser = require('cookie-parser')
const {app , server} = require('./socket/index')
const path = require('path');



// const app = express(); 
app.use(cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}
))
 



app.use(express.json())
app.use(cookieparser())

const PORT = process.env.PORT || 3000; 

// app.get('/', (req , res)=>{
//     res.json({
//         message : "Server is running on " + PORT
//     })
// })

connectDB().then(()=>{
    server.listen(PORT, () => {
    })
})
const _dirname = path.resolve()

//api endpoint
app.use('/api', router)


app.use(express.static(path.join(_dirname , "/client/dist")));
app.get('*',( _,res)=>{
    res.sendFile(path.resolve(_dirname, "client" , "dist" , "index.html"));
})
