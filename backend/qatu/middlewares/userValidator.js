import { nameValidation, emailValidation, passwordValidation, newPasswordValidation } from './commonValidators.js';
import { body, param } from 'express-validator';

export const validateRegister = [
  nameValidation,
  emailValidation,
  passwordValidation
];

export const validateResetPassword = [
  emailValidation,
  newPasswordValidation
];

export const validateLogin = [
  body('email')
    .normalizeEmail()
    .notEmpty().withMessage('Email é obrigatório.')
    .isEmail().withMessage('Formato de email inválido.'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória.')
];

export const deleteUserValidation = [
    param('id')
        .isMongoId()
        .withMessage('ID de usuário inválido')
];