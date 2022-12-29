const Like = require("../model/likeCommentModel");
const Dislike = require("../model/dislikeCommentModel");
const notifications = require("../model/notificationModel");

exports.addLike = (req, res, next) => {
  Dislike.findOneAndDelete({
    $and: [{ idUser: req.body.userId, idComment: req.body.commentId }],
  })
    .then(() => {
      Like.findOne({
        $and: [{ idUser: req.body.userId, idComment: req.body.commentId }],
      }).then((like) => {
        if (like === null) {
          const like = new Like({
            idComment: req.body.commentId,
            idUser: req.body.userId,
          });
          like
            .save()
            .then((data) => {
              res.status(201).json({ data, message: "new like save" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
          // const notification = new notifications({
          //   description: req.body.notification,
          //   videoId: req.body.video,
          //   commentUserId: req.body.commentUserId,
          //   commentId: req.body.parentId,
          //   currentUserId: req.body.userId,
          //   userName: req.body.userName,
          // })
          //   .save()
          //   .then((data) => {
          //     res.status(201).json({ data });
          //   })
          //   .catch((error) => {
          //     res.status(400).json({ error });
          //   });
        } else {
          res.status(200).json({ message: "already like" });
        }
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.getAllCommentsLike = (req, res, next) => {
  Like.find()
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(400).json({ error }));
};
