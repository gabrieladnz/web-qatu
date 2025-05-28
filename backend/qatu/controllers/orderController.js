import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import UserModel from '../models/userModel.js';
import { triggerOrderNotifications } from '../utils/notificationTriggers.js';
import { triggerOrderStatusNotification } from '../utils/notificationTriggers.js';

/**
 * Cria um pedido a partir do carrinho do usuário logado.
 */
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

    // Cria o pedido com buyer, produtos e sellers
    const order = new Order({
      buyer: userId,
      products: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        seller: item.seller   // 👈 ESSENCIAL: usa o seller do carrinho
      })),
      total: cart.total
    });

    await order.save();
    await triggerOrderNotifications(order, userId);

    // Atualiza o estoque de cada produto
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Limpa o carrinho
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

    // Verifica se o user é vendedor de pelo menos um produto
    const isSeller = order.products.some(p => p.seller.toString() === userId);
    if (!isSeller) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas o vendedor pode atualizar o status deste pedido.'
      });
    }

    // Atualiza e salva
    order.status = status;
    await order.save();
    await triggerOrderStatusNotification(order.buyer, status, order._id);

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

/**
 * Lista todos os pedidos do usuário logado
 * Filtra por status (opcional) ex: /my-orders?status=shipped
 */
export const getMyOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.userId; // ID do usuário logado (do token)
    
    const filters = { buyer: userId };
    if (status) filters.status = status;

    const orders = await Order.find(filters)
      .populate('buyer', 'name email') 
      .populate('products.product', 'title price') 
      .sort({ createdAt: -1 });  

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar seus pedidos',
      error: err.message
    });
  }
};


/**
 * Lista todos os pedidos onde o usuário logado é vendedor
 * Filtros opcionais: status e productId
 * Ex: /seller-orders?status=shipped&productId=123
 */
export const getSellerOrders = async (req, res) => {
  try {
    const { status, productId } = req.query;
    const sellerId = req.userId; // ID do vendedor logado

    const filter = { 
      'products.seller': sellerId 
    };

    if (status) filter.status = status;
    if (productId) filter['products.product'] = productId;

    const orders = await Order.find(filter)
      .populate('buyer', 'name email') // Info do comprador
      .populate('products.product', 'title price') // Info básica do produto
      .sort({ createdAt: -1 }); // Mais recentes primeiro

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

    } catch (err) {
        if (
        err.name === 'CastError' ||
        (err.message && err.message.includes('Cast to ObjectId'))
        ) {
        return res.status(200).json({
            success: true,
            count: 0,
            orders: []
        });
        }
        res.status(500).json({
        success: false,
        message: 'Não há pedidos no momento!',
        error: err.message
        });
    }
};

/**
 * GET /api/orders/seller
 * Retorna o histórico de vendas do vendedor logado.
 * Responde com um array de pedidos contendo:
 * - informações do comprador
 * - produtos vendidos
 * - status do pedido
 * - data da compra
 */
export const getSalesHistory = async (req, res) => {
  try {
    const sellerId = req.userId;

    const orders = await Order.find({ 'products.seller': sellerId })
      .populate('buyer', 'name email')
      .populate('products.product', 'title price image')
      .sort({ createdAt: -1 });

      const sales = orders.map(order => ({
      _id: order._id,
      buyer: order.buyer,
      status: order.status,
      createdAt: order.createdAt,
      products: order.products
        .filter(p => p.seller.toString() === sellerId)
        .map(p => ({
          product: p.product,
          quantity: p.quantity,
          price: p.product.price
        }))
    }));

    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({
      message: 'Erro ao buscar histórico de vendas',
      error: err.message
    });
  }
};
