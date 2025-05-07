import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

export const checkout = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Carrinho vazio.' });
    }

    // Validação de estoque
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Produto sem estoque suficiente: ${product?.title}` });
      }
    }

    // Criar o pedido
    const order = new Order({
      user: userId,
      products: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      total: cart.total
    });

    await order.save();

    // Atualizar estoque
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Limpar carrinho
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({ message: 'Pedido realizado com sucesso.', order });

  } catch (err) {
    res.status(500).json({ message: 'Erro no checkout.', error: err.message });
  }
};
