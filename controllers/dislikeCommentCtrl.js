const Dislike = require('../model/dislikeCommentModel')
const Like = require('../model/likeCommentModel')

exports.addDislike = (req,res,next) => {
    Like.findOneAndDelete({$and:[{idUser : req.body.userId, idComment : req.body.commentId}]})
    .then(()=> {
        Dislike.findOne({$and:[{idUser : req.body.userId, idComment : req.body.commentId}]})
        .then((dislike)=> {
            if(dislike === null){
                    const dislike = new Dislike({
                        idComment : req.body.commentId,
                        idUser : req.body.userId
                    })
                    dislike.save()
                        .then((data) => { res.status(201).json({data,message:'new dislike save'})})
                        .catch(error => { res.status(400).json( { error })})
            }else{
                res.status(200).json({message:'comment already disliked'})
            }
        })
    .catch(error => { res.status(404).json({ error}) })})
}

exports.getAllCommentsDisLike = (req,res,next) => {
    Dislike.find()
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({error}))

}
