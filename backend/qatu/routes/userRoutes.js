import express from 'express';
import { registerUser, updateUser, resetPassword, getAllUsers, getUserById, loginUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

// Rotas protegidas
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.get('/', authenticate, getAllUsers); 

router.patch('/:id/status', authenticate, updateOrderStatus);

export default router;
