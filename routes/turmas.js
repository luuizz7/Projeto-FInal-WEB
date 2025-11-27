const express = require('express')
const router = express.Router()
const turmaController = require('../controllers/turmaController')
const { checarLogin } = require('./middleware')

router.get('/', checarLogin, turmaController.list)
router.get('/novo', checarLogin, turmaController.form)
router.post('/novo', checarLogin, turmaController.create)

router.get('/editar/:id', checarLogin, turmaController.editView)
router.post('/editar/:id', checarLogin, turmaController.update)

router.get('/deletar/:id', checarLogin, turmaController.delete)

module.exports = router
