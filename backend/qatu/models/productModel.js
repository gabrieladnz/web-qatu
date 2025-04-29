import mongoose from 'mongoose';

/**
 * @file Define o schema do produto.
 * @module models/productModel
 */
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['tecnologia', 'casa e móveis', 'esportes', 'moda', 'beleza', 'infantil'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  ratings: [
    {
      score: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, default: '' }
    }
  ]
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
