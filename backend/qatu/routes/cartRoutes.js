import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import {authenticate} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticate, addToCart);
router.delete('/remove', authenticate, removeFromCart);
router.get('/', authenticate, getCart);

export default router;
