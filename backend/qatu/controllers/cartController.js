import CartModel from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { triggerAddToCartNotification } from '../utils/notificationTriggers.js';

/**
 * Adiciona um produto ao carrinho do usuário
 */
export const addToCart = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      const sellerId = product.seller;
      if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
  
      if (quantity > product.stock) {
        return res.status(400).json({ message: 'Quantidade solicitada excede o estoque disponível.' });
      }
  
      let cart = await CartModel.findOne({ user: userId });
  
      if (!cart) {
        cart = new CartModel({ user: userId, items: [] });
      }
  
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
      const totalQuantity = existingItem.quantity + quantity;

      if (totalQuantity > 30) {
          return res.status(400).json({ message: 'Limite de 30 unidades por produto no carrinho excedido.' });
      }

      existingItem.quantity = totalQuantity;
      } else {
      if (quantity > 30) {
          return res.status(400).json({ message: 'Você só pode adicionar até 30 unidades por produto.' });
      }

      cart.items.push({ product: productId, quantity, seller: sellerId });
      }  
      
      await calculateCartTotal(cart);
      await cart.save();
      await triggerAddToCartNotification(userId, productId, quantity);

      res.status(200).json({ message: 'Produto adicionado ao carrinho.', cart });
  
    } catch (err) {
      res.status(500).json({ message: 'Erro ao adicionar ao carrinho.', error: err.message });
    }
};
  
/**
 * Remove um item do carrinho
 */
export const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado.' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Produto não encontrado no carrinho.' });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1); // remove o item completamente
    }

    await calculateCartTotal(cart); // atualiza o total com base no novo estado
    await cart.save();

    res.status(200).json({ message: 'Produto removido do carrinho.', cart });

  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover do carrinho.', error: err.message });
  }
};


/**
 * Retorna o carrinho atual do usuário logado
 */
export const getCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await CartModel.findOne({ user: userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado.' });

    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar carrinho.', error: err.message });
  }
};

const calculateCartTotal = async (cart) => {
    let total = 0;
  
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        total += product.price * item.quantity;
      }
    }
  
    cart.total = total;
  };
  