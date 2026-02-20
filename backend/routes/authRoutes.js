import express from 'express';
import * as authController from '../controllers/authController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.post('/logout', verifyToken, authController.logout);
router.get('/profile', verifyToken, authController.getProfile);
router.get('/check', verifyToken, authController.checkAuth); // New route to verify token

export default router;
