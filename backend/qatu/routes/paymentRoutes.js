import express from 'express';
import { pagamentoSimulado } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkout', authenticate, pagamentoSimulado); 

export default router;

