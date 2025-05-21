import { nameValidation, emailValidation, passwordValidation, newPasswordValidation } from './commonValidators.js';
import { body } from 'express-validator';

export const validateRegister = [
  nameValidation,
  emailValidation,
  passwordValidation
];

export const validateResetPassword = [
  emailValidation,
  newPasswordValidation
];