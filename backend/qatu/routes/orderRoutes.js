import express from 'express';
import { checkout } from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkout', authenticate, checkout);

export default router;
