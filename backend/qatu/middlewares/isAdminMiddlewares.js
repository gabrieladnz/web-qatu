import UserModel from '../models/userModel.js';

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Acesso negado. Requer privilégios de admin.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao verificar permissões', error: err.message });
  }
};