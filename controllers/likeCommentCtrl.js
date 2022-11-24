const Like = require('../model/likeModel')

exports.addLike = (req,res,next) => {
    const like = new Like({
        id_comment : req.body.commentid
    })
    like.save()
    .then((data) => { res.status(201).json({data})})
    .catch(error => { res.status(400).json( { error })})
}

exports.getAllCommentsLike = (req,res,next) => {
    Like.find()
    .then(like => res.status(200).json(like))
    .catch(error => res.status(400).json({error}))

}