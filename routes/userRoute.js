const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.get('/signup', userCtrl.signup )
router.post('/signin', userCtrl.signin)
router.get('update',)


module.exports = router