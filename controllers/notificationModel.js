const notifications = require("../model/notificationModel");

exports.createCommment = (req, res, next) => {
  const notification = new notifications({
    description: req.body.description,
    videoId: req.body.video,
    commentUserId: req.body.commentUserId,
    commentId: req.body.commentId,
    currentUserId: req.body.currentUserId,
    userName: req.body.userName,
    channelId : req.body.channelId
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

exports.getAllComments = (req, res, next) => {
  const urlParams = req.params.userId;
  notifications
    .find({ commentUserId: urlParams })
    .then((notification) => res.status(200).json(notification))
    .catch((error) => res.status(400).json(console.log(error)));
};
