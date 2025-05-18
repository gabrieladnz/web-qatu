import Notification from '../models/notificationModel.js';

/**
 * Serviço para criar notificações no sistema.
 * Centraliza e simplifica a criação de notificações para buyer ou seller.
 */
class NotificationService {
    static async createNotification({user, role, type, message}) {
        try {
            const notification = new Notification({
                user,
                role,
                type,
                message
            });

            await notification.save();
            return notification;
        } catch (err) {
            console.error('Erro ao criar notificação:', err.message);
            throw new Error('Não foi possível criar a notificação.');
        }
    }
}

export default NotificationService;