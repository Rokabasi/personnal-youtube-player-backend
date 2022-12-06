const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.post('/auth', userCtrl.signup )
router.post('/user', userCtrl.getOneUser)
router.put('/update', userCtrl.updateUser)

module.exports = router