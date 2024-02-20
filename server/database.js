const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const dbConnect = (req,res)=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("Database is Connected"))
    .catch((err)=>{
        console.log(err)
        process.exit(1)
    })
}

module.exports = dbConnect