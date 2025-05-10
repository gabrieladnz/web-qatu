import express from 'express';
import { 
  checkout,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddlewares.js'; 

const router = express.Router();

// Rotas existentes (mantidas intactas)
router.post('/checkout', authenticate, checkout);

// Novas rotas CRUD
router.get('/', authenticate, isAdmin, getAllOrders); // Apenas admin
router.get('/:id', authenticate, getOrderById); // Dono do pedido ou admin
router.put('/:id', authenticate, updateOrder); // Atualizar status
router.delete('/:id', authenticate, deleteOrder); // Cancelar pedido

export default router;