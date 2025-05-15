import express from 'express';
import { registerUser, updateUser, resetPassword, getAllUsers, getUserById, loginUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { becomeSeller } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', authenticate, resetPassword);

// Rotas protegidas
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.get('/', authenticate, getAllUsers); 

// Endpoint para virar vendedor
router.patch('/:id/become-seller', authenticate, becomeSeller);

export default router;