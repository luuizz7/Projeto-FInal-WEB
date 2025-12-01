const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const { checarLogin } = require('./middleware');

router.get('/', checarLogin, professorController.list);
router.get('/novo', checarLogin, professorController.form);
router.post('/novo', checarLogin, professorController.create);

router.get('/editar/:id', checarLogin, professorController.editView);
router.post('/editar/:id', checarLogin, professorController.update);

router.get('/deletar/:id', checarLogin, professorController.delete);

module.exports = router;
