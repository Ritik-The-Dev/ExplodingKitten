const express = require('express')
const app = express()
const dotenv = require('dotenv')
const dbConnect = require('./database')
const router = require('./route')
const cors = require('cors')
dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use('/api/v1',router)
app.listen(PORT,()=>console.log(`Server is Connected at Port ${PORT}`))
dbConnect()
app.use('/',(req,res)=>{
    res.send('Kitten Backend is Started')
})