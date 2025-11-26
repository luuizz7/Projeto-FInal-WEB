// rotas de alunos (crud completo)

const express = require('express')
const router = express.Router()
const alunoController = require('../controllers/alunoController')
const { checarLogin } = require('./middleware')

router.get('/', checarLogin, alunoController.list)        
router.get('/novo', checarLogin, alunoController.form)   
router.post('/novo', checarLogin, alunoController.create) 
router.get('/editar/:id', checarLogin, alunoController.editView) 
router.post('/editar/:id', checarLogin, alunoController.update)
router.get('/deletar/:id', checarLogin, alunoController.delete) 

module.exports = router

