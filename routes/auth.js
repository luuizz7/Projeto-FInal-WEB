const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// login
router.get('/login', authController.loginView)
router.post('/login', authController.login)

// registro
router.get('/register', authController.registerView)
router.post('/register', authController.register)

// logout
router.get('/logout', authController.logout)

module.exports = router
