import { body } from 'express-validator';

/**
 * Valida os dados de cadastro de usuário.
 */
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ min: 3, max: 50 }).withMessage('Nome deve ter entre 3 e 50 caracteres.'),

  body('email')
    .normalizeEmail()
    .notEmpty().withMessage('Email é obrigatório.')
    .isEmail().withMessage('Formato de email inválido.'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória.')
    .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres.')
    .matches(/[a-z]/).withMessage('Senha deve conter uma letra minúscula.')
    .matches(/[A-Z]/).withMessage('Senha deve conter uma letra maiúscula.')
    .matches(/\d/).withMessage('Senha deve conter um número.')
    .matches(/[\W_]/).withMessage('Senha deve conter um caractere especial.')
];
