import express from 'express';
import { registerUser, updateUser, resetPassword, getAllUsers, getUserById, loginUser } from '../controllers/userController.js';
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

// Rotas protegidas
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.get('/', authenticate, getAllUsers); 

export default router;
