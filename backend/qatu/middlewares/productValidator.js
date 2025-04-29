import { body } from 'express-validator';

export const validateProduct = [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('stock').isInt({ min: 1 }).withMessage('Estoque deve ser um número inteiro positivo'),
  body('category').isIn(['tecnologia', 'casa e móveis', 'esportes', 'moda', 'beleza', 'infantil'])
    .withMessage('Categoria inválida')
];
