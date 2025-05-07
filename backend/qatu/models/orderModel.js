import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }
    ],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
