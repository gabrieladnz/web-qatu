import { body } from 'express-validator';

export const nameValidation = body('name')
  .trim()
  .notEmpty().withMessage('Nome é obrigatório.')
  .isLength({ min: 3, max: 50 }).withMessage('Nome deve ter entre 3 e 50 caracteres.');

export const emailValidation = body('email')
  .normalizeEmail()
  .notEmpty().withMessage('Email é obrigatório.')
  .isEmail().withMessage('Formato de email inválido.');

export const passwordValidation = body('password')
  .notEmpty().withMessage('Senha é obrigatória.')
  .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres.')
  .matches(/[a-z]/).withMessage('Senha deve conter uma letra minúscula.')
  .matches(/[A-Z]/).withMessage('Senha deve conter uma letra maiúscula.')
  .matches(/\d/).withMessage('Senha deve conter um número.')
  .matches(/[\W_]/).withMessage('Senha deve conter um caractere especial.');

// Para reset password
export const newPasswordValidation = body('newPassword')
  .notEmpty().withMessage('Nova senha é obrigatória.')
  .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres.')
  .matches(/[a-z]/).withMessage('Senha deve conter uma letra minúscula.')
  .matches(/[A-Z]/).withMessage('Senha deve conter uma letra maiúscula.')
  .matches(/\d/).withMessage('Senha deve conter um número.')
  .matches(/[\W_]/).withMessage('Senha deve conter um caractere especial.');
