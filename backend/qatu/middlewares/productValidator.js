import { body } from 'express-validator';

const validCategories = [
  'tecnologia',
  'casa e móveis',
  'esportes',
  'moda',
  'beleza',
  'infantil'
];

export const validateProduct = [
  body('title')
    .notEmpty().withMessage('Título é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('Título deve ter entre 3 e 100 caracteres'),
    
  body('description')
    .notEmpty().withMessage('Descrição é obrigatória')
    .isLength({ min: 10 }).withMessage('Descrição deve ter pelo menos 10 caracteres'),

  body('price')
    .isFloat({ min: 0.01 }).withMessage('Preço deve ser um número maior que 0.1'),

  body('stock')
    .isInt({ min: 1 }).withMessage('Estoque deve ser um número inteiro positivo'),

  body('category')
    .isIn(validCategories).withMessage('Categoria inválida')
];

