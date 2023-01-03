const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
        description : {type : String , require: true},
        commentId : { type : String, require : true},   
        currentUserId : { type : String, require : true}, 
        commentUserId : { type : String, require : true},    
        videoId : { type : String, require : true}, 
        userImage : { type : String, require : true}, 
        userName : { type : String, require : true},   
        mention : { type : String}
},
{
    timestamps :true
})
module.exports = mongoose.model('notifictionModel',notificationSchema )

