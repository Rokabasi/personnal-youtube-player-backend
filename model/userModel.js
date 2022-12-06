const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : { type : String, require : true},
    name : { type :String, require :true},
    facebook : { type : String},
    twitter : { type : String},
    instagram : { type : String},
    img : {type : String}
})

module.exports = mongoose.model('usermodel',userSchema)