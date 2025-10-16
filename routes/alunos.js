import express from 'express';
import * as alunoController from '../controllers/alunoController.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

// Todas as rotas de alunos agora exigem login
router.use(isAuthenticated);

router.get('/', alunoController.listAlunos);
router.get('/novo', alunoController.showCreateForm);
router.post('/novo', alunoController.createAluno);
router.get('/editar/:id', alunoController.showEditForm);
router.post('/editar/:id', alunoController.updateAluno);
router.post('/deletar/:id', alunoController.deleteAluno);

export default router;
