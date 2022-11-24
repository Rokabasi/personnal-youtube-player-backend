const express = require('express')
const router = express.Router()
const dislike = require('../controllers/dislikeCommentCtrl')

router.post('/add', dislike.addDislike)
router.get('/', dislike.getAllCommentsDisLike)

module.exports = router
