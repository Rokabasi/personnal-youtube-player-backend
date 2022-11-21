const express = require('express')
const mongoose = require('mongoose')
const connectDb = require('./config/connexion')


const app = express()
connectDb()
const port = process.env.PORT || 9000


app.listen(port, ()=>{
    console.log("server running");
})