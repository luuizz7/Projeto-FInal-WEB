import express from 'express';
import * as turmaController from '../controllers/turmaController.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

// Todas as rotas de turmas agora exigem login
router.use(isAuthenticated);

router.get('/', turmaController.listTurmas);
router.get('/nova', turmaController.showCreateForm);
router.post('/nova', turmaController.createTurma);
router.get('/editar/:id', turmaController.showEditForm);
router.post('/editar/:id', turmaController.updateTurma);
router.post('/deletar/:id', turmaController.deleteTurma);

export default router;
