const Comments = require("../model/commentModels");
const notifications = require("../model/notificationModel");

exports.createCommment = (req, res, next) => {
  const comment = new Comments({
    description: req.body.description,
    video: req.body.video,
    userId: req.body.userId,
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
  if (req.body.parentId !== null) {
    const notification = new notifications({
      // description: req.body.notification,
      // videoId: req.body.video,
      // commentUserId: req.body.commentUserId,
      // commentId: req.body.parentId,
      // currentUserId: req.body.userId,
      userName: req.body.userName,
    })
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

exports.getAllComments = (req, res, next) => {
  const urlParams = req.params.video;
  Comments.find({ video: urlParams })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json(console.log(error)));
};
