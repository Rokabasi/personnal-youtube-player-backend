const express = require('express')
const router = express.Router()
const souscomentctrl = require('../controllers/sousCommentCtrl')

router.post('/add', souscomentctrl.createSousComment)
router.get('/', souscomentctrl.getAllSousComments)

module.exports = router