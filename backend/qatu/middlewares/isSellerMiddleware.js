/**
 * Middleware para permitir apenas usuários com role = seller
 */
import UserModel from '../models/userModel.js';

export const isSeller = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user || !user.isSeller) {
      return res.status(403).json({ 
        success: false,
        message: 'Acesso restrito. Apenas vendedores podem acessar essa rota.' 
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao verificar permissão.', error: err.message });
  }
};
