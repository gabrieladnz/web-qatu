import UserModel from '../models/userModel.js';
import CartModel from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import ProductModel from '../models/productModel.js';
import NotificationModel from '../models/notificationModel.js';
import {loginUserService} from '../services/userService.js'
import { triggerBecomeSellerNotification } from '../utils/notificationTriggers.js';

/**
 * Registra um novo usuário.
 *
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado com este email.' });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    // Cria automaticamente o carrinho vazio
    const cart = new CartModel({
      user: newUser._id,
      items: [],
      total: 0
    });
    await cart.save();

    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registrar usuário.', error: error.message });
  }
};

/**
 * Busca um único usuário pelo ID.
 * @function
 * @param {Object} req - Requisição com ID do usuário como param.
 * @param {Object} res - Retorna o usuário (sem a senha).
 */
export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await UserModel.findById(id).select('-password');
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
    }
  };
  

/**
 * Lista todos os usuários cadastrados (uso interno/admin).
 * @function
 * @param {Object} req - Requisição Express.
 * @param {Object} res - Resposta JSON com a lista de usuários.
 */
export const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find().select('-password'); // oculta senha
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
    }
  };
  

/**
 * Atualiza os dados de um usuário existente.
 *
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // verifica se está tentando alterar para um email já existente
    if (updates.email) {
      const emailExists = await UserModel.findOne({ email: updates.email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Este e-mail já está em uso por outro usuário.' });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
};

/**
 * Redefine a senha de um usuário usando o e-mail.
 * @function
 * @param {Object} req - Requisição com email e nova senha.
 * @param {Object} res - Resposta JSON com sucesso ou erro.
 */
export const resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  
      user.password = newPassword; // o pre('save') vai criptografar
      await user.save();
  
      res.status(200).json({ success: true, message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao redefinir senha.', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password} = req.body
    
    if(!email || !password)  {
        return res.status(400).json({ success: false, message: 'Senha ou email inválidos.' })
    }
    try{
        const{token, message, _id} = await loginUserService( email, password);
        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            token,
            message,
            _id
        });
    }catch (error){
        res.status(error.status || 500).json({success: false, message: error.message})
    }
};
  
/**
 * @route PATCH /api/users/:id/become-seller
 * @desc Permite ao usuário virar um vendedor (isSeller = true)
 * @access Authenticated User (Owner)
 */
export const becomeSeller = async (req, res) => {
    try {
      const userId = req.userId; // do token
      const paramId = req.params.id;
  
      // Verifica se o usuário está tentando alterar a própria conta
      if (userId !== paramId) {
        return res.status(403).json({ 
          success: false,
          message: 'Acesso negado. Você só pode alterar sua própria conta.' 
        });
      }
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'Usuário não encontrado.' 
        });
      }
  
      // Atualiza para vendedor
      user.isSeller = true;
      await user.save();
      await triggerBecomeSellerNotification(userId);
  
      res.status(200).json({ 
        success: true,
        message: 'Parabéns! Agora sua conta é de vendedor.',
        user: { id: user._id, name: user.name, email: user.email, isSeller: user.isSeller }
      });
  
    } catch (err) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar para vendedor.',
        error: err.message 
      });
    }
  };

  export const logoutUser = (req, res) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: 'Token não encontrado no header.' 
      });
    }

    addToBlacklist(token);

    res.status(200).json({ 
      success: true, 
      message: 'Logout realizado com sucesso.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao fazer logout.', 
      error: error.message 
    });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const paramId = req.params.id;   
        const userId = req.userId;          

        // Só permite deletar a própria conta
        if (userId !== paramId) {
            return res.status(403).json({ 
                success: false,
                message: 'Acesso negado. Você só pode deletar sua própria conta.' 
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuário não encontrado.' 
            });
        }

        // Verifica se há pedidos em andamento (nem como comprador, nem como vendedor)
        const activeOrders = await Order.find({
            $or: [
                { buyer: userId, status: { $nin: ['delivered', 'cancelled'] } },
                { seller: userId, status: { $nin: ['delivered', 'cancelled'] } }
            ]
        });

        if (activeOrders.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Não é possível deletar a conta com pedidos em andamento'
            });
        }

        // Remove produtos do usuário se for vendedor
        if (user.isSeller) {
            await ProductModel.deleteMany({ seller: userId });
        }

        // Remove carrinho do usuário
        await CartModel.deleteOne({ user: userId });

        // Remove pedidos do usuário (como comprador ou vendedor)
        await Order.deleteMany({
            $or: [{ buyer: userId }, { seller: userId }]
        });

        // Remove notificações do usuário
        await NotificationModel.deleteMany({ user: userId });

        // Finalmente, remove o usuário
        await UserModel.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: 'Conta deletada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao deletar usuário',
            error: error.message
        });
    }
};