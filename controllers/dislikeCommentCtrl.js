const Dislike = require('../model/dislikeCommentModel')

exports.addDislike = (req,res,next) => {
    const dislike = new Dislike({
        id_comment : req.body.commentid
    })
    dislike.save()
    .then((data) => { res.status(201).json({data})})
    .catch(error => { res.status(400).json( { error })})
}

exports.getAllCommentsDisLike = (req,res,next) => {
    Dislike.find()
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({error}))

}
