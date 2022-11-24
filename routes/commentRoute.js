const express = require("express")
const router = express.Router()
const Comment = require("../controllers/commentsCtrl")


router.get('/', Comment.getAllComments )
router.post('/addcomment', Comment.createCommment)

module.exports = router