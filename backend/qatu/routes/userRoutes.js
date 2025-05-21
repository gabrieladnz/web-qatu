import express from 'express';
import { registerUser, updateUser, resetPassword, getAllUsers, getUserById, loginUser, logoutUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { becomeSeller } from '../controllers/userController.js';
import { validateRegister, validateResetPassword, validateLogin} from '../middlewares/userValidator.js';
import { nameValidation, emailValidation} from '../middlewares/commonValidators.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.post('/register',validateRegister, handleValidationErrors, registerUser);
router.post('/login',validateLogin,handleValidationErrors, loginUser);
router.post('/reset-password', authenticate, validateResetPassword, handleValidationErrors, resetPassword);

// Rotas protegidas
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, nameValidation, emailValidation, handleValidationErrors, updateUser);
router.get('/', authenticate, getAllUsers); 
router.post('/logout', authenticate, logoutUser);

// Endpoint para virar vendedor
router.patch('/:id/become-seller', authenticate, becomeSeller);

export default router;