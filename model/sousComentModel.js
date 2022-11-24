const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
        description : {type : String , require: true},
        id_comment : { type : String, require : true }    
},
{
    timestamps :true
})
module.exports = mongoose.model('souscommentModel',commentSchema )