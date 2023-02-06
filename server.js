const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDb = require("./config/connexion");
const commentModels = require("./model/commentModels");
const likeModels = require("./model/likeCommentModel");
const dislikeModels = require("./model/dislikeCommentModel");
const userModel = require("./model/userModel");
const notifications = require("./model/notificationModel");

connectDb();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,POST","PUT"],
  },
});
io.on("connection", (socket) => {
  socket.on("sendComment", (message) => {
    const comment = new commentModels({
      description: message.description,
      video: message.video,
      userId: message.userId,
      userName: message.userName,
      parentId: message.parentId,
      userImage: message.userImage,
    });
    comment.save().then((newComment) => {
      {
        io.emit("getNewComment", newComment);
      }
    });
    if (message.parentId !== null) {
      const notification = new notifications({
        description: message.notification,
        videoId: message.video,
        commentUserId: message.commentUserId,
        commentId: message.parentId,
        currentUserId: message.userId,
        userName: message.userName,
        mention: null,
        channelId: message.channelId,
        userImage: message.userImage,
      });
      notification.save().then((data) => {
        io.emit("receiveNewnotification", data);
      });
    }
  });

  socket.on("getAllComments", () => {
    commentModels
      .find()
      .sort({ createdAt: -1 })
      .then((comment) => io.emit("receiveAllComments", comment))
      .catch((error) => socket.emit("receiveAllComments", error));
  });

  socket.on("getNotifications", (userId) => {
    notifications
      .find({ commentUserId: userId })
      .sort({ createdAt: -1 })
      .then((notification) => socket.emit("receiveAllNotifications", notification));
  });

  socket.on("UpdateNotifications", (userId) => {
    const mention = "see";
    notifications
      .updateMany({ commentUserId: userId }, { $set: { mention: mention } })
      .then((comment) => socket.emit("receiveUpdateNotifications", comment))
      .catch((error) => socket.emit("receiveUpdateNotifications", error));
  });
  socket.on("getLike", () => {
    likeModels
      .find()
      .then((like) => io.emit("receiveAllLike", like))
      .catch((error) => socket.emit("receiveAllLike", error));
  });
  socket.on("sendLike", ({ likeData }) => {
    dislikeModels
      .findOneAndDelete({
        $and: [{ idUser: likeData.userId, idComment: likeData.commentId }],
      })
      .then(() => {
        likeModels
          .findOne({
            $and: [{ idUser: likeData.userId, idComment: likeData.commentId }],
          })
          .then((like) => {
            if (like === null) {
              const like = new likeModels({
                idComment: likeData.commentId,
                idUser: likeData.userId,
              });
              like.save().then((like) => {
                io.emit("receiveNewLike", like);
              });
              const notification = new notifications({
                description: likeData.notification,
                videoId: likeData.video,
                commentUserId: likeData.commentUserId,
                commentId: likeData.commentId,
                currentUserId: likeData.userId,
                userName: likeData.userName,
                mention: null,
                userImage: likeData.userImage,
                channelId: likeData.channelId,
              });
              notification.save().then((data) => {
                io.emit("receiveNewnotification", data);
              });
            }
          });
      });
  });

  socket.on("sendDislike", ({ dislikeData }) => {
    likeModels
      .findOneAndDelete({
        $and: [
          { idUser: dislikeData.userId, idComment: dislikeData.commentId },
        ],
      })
      .then(() => {
        dislikeModels
          .findOne({
            $and: [
              { idUser: dislikeData.userId, idComment: dislikeData.commentId },
            ],
          })
          .then((dislike) => {
            if (dislike === null) {
              const dislike = new dislikeModels({
                idComment: dislikeData.commentId,
                idUser: dislikeData.userId,
              });
              dislike.save().then((dislike) => {
                io.emit("receiveNewDislike", dislike);
              });
              const notification = new notifications({
                description: dislikeData.notification,
                videoId: dislikeData.video,
                commentUserId: dislikeData.commentUserId,
                commentId: dislikeData.commentId,
                currentUserId: dislikeData.userId,
                userName: dislikeData.userName,
                mention: null,
                userImage: dislikeData.userImage,
                channelId: dislikeData.channelId,
              });
              notification.save().then((data) => {
                io.emit("receiveNewnotification", data);
              });
            }
          });
      })
      .catch((error) => {
        // socket.emit("receiveAllLike", error);
      });
  });

  socket.on("getDislike", () => {
    dislikeModels
      .find()
      .then((dislike) => io.emit("receiveAllDislike", dislike))
      .catch((error) => socket.emit("receiveAllDislike", error));
  });

  socket.on("sendUser", (newUser) => {
    userModel.findOne({ email: newUser.email }).then((user) => {
      if (user === null) {
        const user = new userModel({
          email: newUser.email,
          displayName: newUser.displayName,
          userImage: newUser.userImage,
        });
        user
          .save()
          .then((user) => {
            socket.emit("receiveUser", user);
          })
          .catch((error) => {
            socket.emit("receiveErrorUser", error);
          });
      } else {
        socket.emit("receiveUser", user);
      }
    });
  });

  socket.on("getOneUser", (userEmail) => {
    userModel
      .find({ email: userEmail })
      .then((user) => io.emit("receiveOneUser", user[0]))
      .catch((error) => socket.emit("receiveOneUser", error));
  });
  socket.on("updateOneUser", (userData) => {
    
    const user = {
      _id: userData._id,
      email: userData.email,
      userImage : userData.userImage,
      displayName: userData.displayName,
      facebookLink: userData.facebookLink,
      twitterLink: userData.twitterLink,
      instagramLink: userData.instagramLink,
      linkedInLink: userData.linkedInLink,
      facebookText: userData.facebookLinkText,
      twitterText: userData.twitterLinkText,
      instagramLinkText: userData.instagramLinkText,
      linkedInLinkText: userData.linkedInLinkText,
    };
    userModel
      .findOneAndUpdate({ _id: userData._id }, { ...user })
      .then((user) => {
        if (user) {
          io.emit("receiveUpdateUser", user[0]);
        }
      });
  });
});

server.listen(9001, () => {
  console.log("server is running");
});
