import express from 'express';
import { 
  checkout,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
  getSellerOrders
} from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddlewares.js'; 
import { updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

// Rotas existentes (mantidas intactas)
router.post('/checkout', authenticate, checkout);

// Novas rotas CRUD
router.get('/seller-orders', authenticate, getSellerOrders);
router.get('/my-orders', authenticate, getMyOrders);
router.get('/', authenticate, isAdmin, getAllOrders); // Apenas admin
router.get('/:id', authenticate, getOrderById); // Dono do pedido ou admin
router.put('/:id', authenticate, updateOrder); // Atualizar status
router.delete('/:id', authenticate, deleteOrder); // Cancelar pedido
router.patch('/:id/status', authenticate, updateOrderStatus);

export default router;