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

/**
 * @file Rotas de produtos.
 * @module routes/productRoutes
 */
const router = express.Router();

router.post('/', validateProduct, handleValidationErrors, createProduct);
router.post('/:id/review', addProductReview);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', validateProduct, handleValidationErrors, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
