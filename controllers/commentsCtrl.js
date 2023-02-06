const Comments = require("../model/commentModel");

exports.createCommment = (req, res, next) => {
  const comment = new Comments({
    description: req.body.description,
    video: req.body.video,
    userid: req.body.userId,
    parentId: req.body.parentId,
  });
  comment
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.videoId = (req,res,next) =>{
//     const video = 'dcs'
// }

exports.getAllComments = (req, res, next) => {
  const urlParams = req.params.video;
  Comments.find({ video: urlParams })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json(console.log(error)));
};
