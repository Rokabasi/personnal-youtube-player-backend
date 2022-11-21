const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name : { type :String, require :true},
    email : { type : String, require : true},
    facebook : { type : String},
    twitter : { type : String},
    instagram : { type : String},
})

module.exports = mongoose.model('usermodel',userSchema)