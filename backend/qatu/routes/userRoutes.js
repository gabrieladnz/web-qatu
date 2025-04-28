import express from 'express';
import { registerUser, updateUser, resetPassword, getAllUsers, getUserById, loginUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * Rota para registrar um novo usuário.
 * @route POST /api/users/register
 */
router.post('/register', registerUser);

/**
 * Rota para login de um usuário.
 * @route POST /api/users/login
 */
router.post('/login', loginUser);

/**
 * Rota para atualizar os dados de um usuário.
 * @route PUT /api/users/:id
 */
router.put('/:id', updateUser); // Ex: /api/users/12342342342342

/**
 * Rota para atualizar a senha de um usuário.
 * @route POST /api/users/:id
 */
router.post('/reset-password', resetPassword);

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
