import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isTokenBlacklisted } from '../utils/tokenBlacklist.js';
dotenv.config();


export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Acesso negado. Token não fornecido.' 
      });
    }

    if (isTokenBlacklisted(token)) {
      return res.status(401).json({ 
        success: false,
        message: 'Token inválido (logout realizado).' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Token inválido ou expirado.' 
    });
  }
};