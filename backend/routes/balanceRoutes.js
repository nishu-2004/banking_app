import express from 'express';
import * as balanceController from '../controllers/balanceController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Protected route
router.get('/check', verifyToken, balanceController.getBalance);

export default router;
