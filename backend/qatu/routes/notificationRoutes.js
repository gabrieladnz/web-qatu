import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getNotifications); // Lista notificações do usuário logado
router.patch('/:id/read', authenticate, markNotificationAsRead); // Marca notificação como lida

export default router;