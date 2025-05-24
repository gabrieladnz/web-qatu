import { jest } from '@jest/globals';
import * as userController from '../controllers/userController.js';
import UserModel from '../models/userModel.js';
import CartModel from '../models/cartModel.js';
import { loginUserService } from '../services/userService.js';
import { triggerBecomeSellerNotification } from '../utils/notificationTriggers.js';
import { addToBlacklist } from '../utils/tokenBlacklist.js';

// Mocks automáticos
jest.mock('../models/userModel.js');
jest.mock('../models/cartModel.js');
jest.mock('../services/userService.js');
jest.mock('../utils/notificationTriggers.js');
jest.mock('../utils/tokenBlacklist.js');

// Sobrescrevendo métodos de Model
UserModel.findOne = jest.fn();
UserModel.findById = jest.fn();
UserModel.find = jest.fn();
UserModel.findByIdAndUpdate = jest.fn();
UserModel.findByIdAndDelete = jest.fn();

CartModel.prototype.save = jest.fn();

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('deve registrar novo usuário com sucesso', async () => {
      const req = { body: { name: 'Pedroa', email: 'pedro1@example.com', password: 'Senha123!' } };
      const res = mockRes();

      UserModel.findOne.mockResolvedValue(null);
      UserModel.prototype.save = jest.fn().mockResolvedValue();
      CartModel.prototype.save.mockResolvedValue();

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it('não deve registrar usuário já existente', async () => {
      const req = { body: { email: 'pedro@example.com' } };
      const res = mockRes();

      UserModel.findOne.mockResolvedValue({ email: 'pedro@example.com' });

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getUserById', () => {
    it('deve retornar usuário existente', async () => {
      const req = { params: { id: '123' } };
      const res = mockRes();

      const select = jest.fn().mockResolvedValue({ name: 'Pedro' });
      UserModel.findById.mockReturnValue({ select });

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar 404 se usuário não encontrado', async () => {
      const req = { params: { id: '123' } };
      const res = mockRes();

      const select = jest.fn().mockResolvedValue(null);
      UserModel.findById.mockReturnValue({ select });

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getAllUsers', () => {
    it('deve retornar lista de usuários', async () => {
      const req = {};
      const res = mockRes();

      const select = jest.fn().mockResolvedValue([{ name: 'Pedro' }]);
      UserModel.find.mockReturnValue({ select });

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('updateUser', () => {
    it('deve atualizar usuário com sucesso', async () => {
      const req = { params: { id: '123' }, body: { name: 'Novo Nome' } };
      const res = mockRes();

      UserModel.findOne.mockResolvedValue(null);
      UserModel.findByIdAndUpdate.mockResolvedValue({ name: 'Novo Nome' });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('não deve atualizar se email já estiver em uso', async () => {
      const req = { params: { id: '123' }, body: { email: 'existente@example.com' } };
      const res = mockRes();

      UserModel.findOne.mockResolvedValue({ email: 'existente@example.com' });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('resetPassword', () => {
    it('deve redefinir senha com sucesso', async () => {
      const req = { body: { email: 'pedro@example.com', newPassword: 'Senha123!' } };
      const res = mockRes();

      const user = { save: jest.fn() };
      UserModel.findOne.mockResolvedValue(user);

      await userController.resetPassword(req, res);

      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar 404 se usuário não encontrado', async () => {
      const req = { body: { email: 'pedro@example.com' } };
      const res = mockRes();

      UserModel.findOne.mockResolvedValue(null);

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('loginUser', () => {
    it('deve falhar se email ou senha não forem fornecidos', async () => {
      const req = { body: { email: '', password: '' } };
      const res = mockRes();

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('becomeSeller', () => {   
    it('deve negar se tentar alterar outra conta', async () => {
      const req = { userId: '123', params: { id: '456' } };
      const res = mockRes();

      await userController.becomeSeller(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  describe('logoutUser', () => {
    it('deve retornar erro se token não for encontrado', () => {
      const req = { header: jest.fn().mockReturnValue(null) };
      const res = mockRes();

      userController.logoutUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});


