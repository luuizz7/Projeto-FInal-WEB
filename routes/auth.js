import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.register);

router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

export default router;
