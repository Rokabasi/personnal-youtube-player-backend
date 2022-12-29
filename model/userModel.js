const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : { type : String, require : true},
    displayName : { type :String, require :true},
    userImage : { type :String, require :true},
    facebookLink : { type : String},
    twitterLink : { type : String},
    instagramLink : { type : String},
    linkedInLink : {type : String},
    facebookLinkText : { type : String},
    twitterLinkText : { type : String},
    instagramLinkText : { type : String},
    linkedInLinkText : {type : String}

})

module.exports = mongoose.model('usermodel',userSchema)