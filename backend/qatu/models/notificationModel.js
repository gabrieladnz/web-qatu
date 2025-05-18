import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema para representar uma notificação do sistema.
 * Contém o usuário destinatário, a mensagem, o tipo de notificação,
 * o papel (comprador ou vendedor) e o status de leitura.
 */
const notificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  /**
   * Define para quem é a notificação (comprador ou vendedor).
   */
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true
  },
  /**
   * Tipo da notificação (ex.: 'cart', 'order', 'status').
   */
  type: {
    type: String,
    enum: ['cart', 'order', 'status', 'system'],
    default: 'system'
  },
  message: {
    type: String,
    required: true
  },
  /**
   * Indica se a notificação já foi lida.
   */
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;