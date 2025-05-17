import Notification from '../models/notificationModel.js';

export const getNotifications = async (req, res) => {
    try{
        const userId = req.userId;
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    }catch (error) {
        res.status(500).json({ message: 'Erro ao buscar notificações', error: error.message });
    }
}
export const markNotificationAsRead = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.userId;
        
        const notification = await Notification.findOneAndUpdate(
            { _id: id, user: userId },
            { read: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: 'Notificação não encontrada' });
        }
        res.status(200).json({ success: true, message: 'Notificação marcada como lida', notification });
    }catch (error) {
        res.status(500).json({ message: 'Erro ao marcar notificação como lida', error: error.message });
    }
}