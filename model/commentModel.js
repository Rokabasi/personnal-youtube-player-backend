const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
        description : {type : String , require: true},
        video : { type : String, require : true},    
},
{
    timestamps :true
})
module.exports = mongoose.model('commentModel',commentSchema )

