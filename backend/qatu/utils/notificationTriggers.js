import NotificationService from '../services/notificationService.js';
import Product from '../models/productModel.js';
import UserModel from '../models/userModel.js';

/**
 * Envia notificação quando um produto é adicionado ao carrinho.
 */
export const triggerAddToCartNotification = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    const user = await UserModel.findById(userId);

    if (!product || !user) return;

    await NotificationService.createNotification({
        user: userId,
        role: user.role,
        type: 'cart',
        message: `Você adicionou ${quantity}x ${product.title} ao carrinho.`
    });
};

/**
 * Envia notificações ao finalizar o checkout.
 */
export const triggerOrderNotifications = async (order, buyerId) => {
    const buyer = await UserModel.findById(buyerId);
    if (!buyer) return;

    // Notifica o comprador
    await NotificationService.createNotification({
        user: buyerId,
        role: buyer.role,
        type: 'order',
        message: `Seu pedido #${order._id} foi realizado com sucesso.`
    });

    // Notifica os vendedores (um seller por produto)
    const uniqueSellers = [...new Set(order.products.map(p => p.seller.toString()))];

    for (const sellerId of uniqueSellers) {
        const seller = await UserModel.findById(sellerId);
        if (!seller) continue;

        await NotificationService.createNotification({
            user: sellerId,
            role: seller.role,
            type: 'order',
            message: `Você recebeu um novo pedido #${order._id} para seus produtos.`
        });
    }
};

/**
 * Envia notificação quando o status do pedido é alterado.
 */
export const triggerOrderStatusNotification = async (buyerId, newStatus, orderId) => {
    const buyer = await UserModel.findById(buyerId);
    if (!buyer) return;

    await NotificationService.createNotification({
        user: buyerId,
        role: buyer.role,
        type: 'status',
        message: `O status do pedido #${orderId} foi atualizado para "${newStatus}".`
    });
};

/**
 * Envia notificação quando o usuário vira vendedor.
 */
export const triggerBecomeSellerNotification = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) return;

    await NotificationService.createNotification({
        user: userId,
        role: user.role,
        type: 'system',
        message: `Parabéns! Sua conta foi atualizada para vendedor no Qatu Marketplace.`
    });
};

