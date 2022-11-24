const express = require('express')
const router = express.Router()
const like = require('../controllers/likeCommentCtrl')

router.post('/add',like.addLike)
router.get('/',like.getAllCommentsLike)
module.exports = router