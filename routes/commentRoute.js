const express = require("express")
const router = express.Router()
const Comment = require("../controllers/commentsCtrl")


router.get('/:video', Comment.getAllComments )
router.post('/add', Comment.createCommment)

module.exports = router