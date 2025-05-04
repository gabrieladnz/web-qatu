import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { validateProduct } from '../middlewares/productValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { addProductReview } from '../controllers/productController.js';
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

/**
 * @file Rotas de produtos.
 * @module routes/productRoutes
 */
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rotas protegidas
router.post('/', authenticate, validateProduct, handleValidationErrors, createProduct);
router.post('/:id/review', authenticate, addProductReview);
router.put('/:id', authenticate, validateProduct, handleValidationErrors, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
