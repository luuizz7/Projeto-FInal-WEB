import express from 'express';
import * as turmaController from '../controllers/turmaController.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

router.get('/', isAuthenticated, turmaController.listTurmas);

router.get('/novo', isAuthenticated, turmaController.showCreateForm);

router.post('/', isAuthenticated, turmaController.createTurma);

router.get('/:id/edit', isAuthenticated, turmaController.showEditForm);

router.put('/:id', isAuthenticated, turmaController.updateTurma);

router.delete('/:id', isAuthenticated, turmaController.deleteTurma);

export default router;