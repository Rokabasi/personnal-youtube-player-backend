const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
        idComment : {type : String , require: true},  
        idUser : { type : String, require : true } 
},
{
    timestamps :true
})
module.exports = mongoose.model('likeCommentModel',commentSchema )