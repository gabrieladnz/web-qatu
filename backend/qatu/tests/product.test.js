import { jest } from '@jest/globals';
import * as productController from '../controllers/productController.js';
import Product from '../models/productModel.js';
// Mock de todas as dependências
jest.mock('../models/productModel.js');

// Sobrescrevendo métodos de Model
Product.find = jest.fn();
Product.findById = jest.fn();
Product.findByIdAndUpdate = jest.fn();
Product.findByIdAndDelete = jest.fn();
Product.countDocuments = jest.fn();
Product.prototype.save = jest.fn();

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockReq = (body = {}, params = {}, user = {}, query = {}) => ({
  body,
  params,
  user: { userId: user.id || '' },
  query
});

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('deve criar um novo produto', async () => {
      const req = mockReq({
        title: 'Produto Teste',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
        price: 100,
        category: 'tecnologia'
      }, {}, { id: 'seller123' });
      const res = mockRes();

      Product.prototype.save.mockResolvedValue({
        ...req.body,
        seller: req.userId,
        _id: 'product123'
      });

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Produto Teste',
        seller: req.userId
      }));
    });
  });

  describe('getAllProducts', () => {
    it('deve retornar produtos com filtros e paginação', async () => {
      const req = mockReq(
        {},
        {},
        {},
        { category: 'tecnologia', page: 2, sort: 'asc' }
      );
      const res = mockRes();

      const mockProducts = [
        { toObject: () => ({ title: 'Produto 1' }), ratings: [] },
        { toObject: () => ({ title: 'Produto 2' }), ratings: [] }
      ];
      Product.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts)
      });
      Product.countDocuments.mockResolvedValue(15);

      await productController.getAllProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({
        category: 'tecnologia'
      });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        productsWithAverage: expect.any(Array),
        pagination: {
          currentPage: 2,
          totalPages: 2,
          totalProducts: 15
        }
      }));
    });
  });

  describe('getProductById', () => {
    it('deve retornar produto com avaliação média', async () => {
      const req = mockReq({}, { id: 'product123' });
      const res = mockRes();

      const mockProduct = {
        _id: 'product123',
        ratings: [{ score: 4 }, { score: 5 }],
        toObject: () => ({ title: 'Produto Teste' })
      };
      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        averageRating: 4.5
      }));
    });
  });

  describe('updateProduct', () => {
    it('deve atualizar produto com sucesso', async () => {
      const req = mockReq(
        { title: 'Novo Título' },
        { id: 'product123' },
        { id: 'seller123' }
      );
      req.userId = req.user.userId;
      const res = mockRes();

      Product.findById.mockResolvedValue({
        _id: 'product123',
        seller: { toString: () => 'seller123' }
      });
      Product.findByIdAndUpdate.mockResolvedValue({ _id: 'product123', title: 'Novo Título' });

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Novo Título' }));
    });
  });

  describe('deleteProduct', () => {
    it('deve permitir exclusão', async () => {
      const req = mockReq({}, { id: 'product123' }, { id: 'seller123' });
      req.userId = req.user.userId;
      const res = mockRes();

      Product.findById.mockResolvedValue({
        _id: 'product123',
        seller: { toString: () => 'seller123' }
      });
      Product.findByIdAndDelete.mockResolvedValue({ _id: 'product123' });

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('addProductReview', () => {
    it('deve adicionar avaliação ao produto', async () => {
      const req = mockReq(
        { score: 5, comment: 'Excelente!' },
        { id: 'product123' }
      );
      const res = mockRes();

      const mockProduct = {
        ratings: [],
        save: jest.fn().mockResolvedValue(true)
      };
      Product.findById.mockResolvedValue(mockProduct);

      await productController.addProductReview(req, res);

      expect(mockProduct.ratings).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  afterAll(async () => {
  jest.clearAllTimers();
});
});