const SousCommentModel = require('../model/sousComentModel')

exports.createSousComment = (req,res,next) => {
    const sousComent = new SousCommentModel({
        description : req.body.description,
        id_comment : req.body.commentId
    })
    sousComent.save()
    .then((data) => { res.status(201).json({data})})
    .catch(error => { res.status(400).json( { error })})
}
exports.getAllSousComments = (req,res,next) => {
    SousCommentModel.find()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({error}))
}