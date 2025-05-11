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

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer', 'name email')
      .populate('products.product', 'title price')
      .populate('products.seller', 'name');
      
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: err.message });
  }
};

// GET /orders/:id - Detalhes de um pedido específico
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email')
      .populate('products.product', 'title price')
      .populate('products.seller', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
  }
};

// PUT /orders/:id - Atualizar status do pedido
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('buyer', 'email');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: err.message });
  }
};

// DELETE /orders/:id - Cancelar pedido (apenas se o status for = pending)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Só é possível cancelar pedidos pendentes' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pedido cancelado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cancelar pedido', error: err.message });
  }
};


/**
 * Atualiza apenas o status de um pedido
 * Requer: Usuário deve ser o comprador OU admin (mesmo que isAdmin não funcione ainda)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: orderId } = req.params;
    const userId = req.userId; // ID do usuário logado

    // Status válidos
    const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: `Status inválido. Use: ${validStatus.join(', ')}`
      });
    }

    // Busca o pedido
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    const isBuyer = order.buyer.toString() === userId;
    if (!isBuyer) {
      return res.status(403).json({ 
        success: false,
        message: 'Acesso negado. Apenas o comprador pode atualizar o status.'
      });
    }

    // Atualiza e salva
    order.status = status;
    await order.save();

    // Resposta com dados populados
    const updatedOrder = await Order.findById(orderId)
      .populate('buyer', 'name email')
      .populate('products.product', 'title price');

    res.status(200).json({
      success: true,
      message: 'Status atualizado com sucesso!',
      order: updatedOrder
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Erro ao atualizar status',
      error: err.message 
    });
  }
};