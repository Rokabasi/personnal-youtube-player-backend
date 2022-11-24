const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
        id_comment : { type : String, require : true},  
        
},
{
    timestamps :true
})
module.exports = mongoose.model('likeCommentModel',commentSchema )

