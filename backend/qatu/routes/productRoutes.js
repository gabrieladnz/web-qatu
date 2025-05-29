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
import { authenticate } from '../middlewares/authMiddleware.js';
import { isSeller } from '../middlewares/isSellerMiddleware.js';

/**
 * @file Rotas de produtos.
 * @module routes/productRoutes
 */
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rotas protegidas
router.post('/', authenticate, isSeller, validateProduct, handleValidationErrors, createProduct);
router.post('/:id/review', authenticate, isSeller, addProductReview);
router.put('/:id', authenticate, isSeller, validateProduct, handleValidationErrors, updateProduct);
router.delete('/:id', authenticate, isSeller, deleteProduct);

export default router;