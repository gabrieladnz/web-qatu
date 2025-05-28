import UserModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

global.sellerToken = null
global.userToken = null;
global.createdProductId = null;
global.testOrderId = null;

const requesting = process.env.BACKEND_URL
  ? supertest(process.env.BACKEND_URL)
  : supertest(app);

afterAll(async () => {
  await productModel.deleteMany({ title: 'Produto Teste' });
  await UserModel.deleteMany({email: 'testeuser@email.com'});
  await mongoose.connection.close();
});

describe('Fluxo de cadastro e login de usuário', () => {
  const user = {
    name: 'testUser#1',
    email: 'testeuser@email.com',
    password: 'Senha123!'
  };

  it('Deve registrar um novo usuário', async () => {
    const res = await requesting
      .post('/api/users/register')
      .send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('Não deve registrar usuário com email já existente', async () => {
    const res = await requesting
      .post('/api/users/register')
      .send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/já cadastrado/i);
  });

  it('Deve fazer login com sucesso', async () => {
    const res = await requesting
      .post('/api/users/login')
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    global.userToken = res.body.token;
  });

  it('Não deve logar com senha errada', async () => {
    const res = await requesting
      .post('/api/users/login')
      .send({ email: user.email, password: 'senhaerrada' });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

describe('Fluxo de cadastro de Produto e visualização', () => {
    const product = {
        title: 'Produto Teste',
        description: 'Descrição do Produto Teste',
        price: 100,
        stock: 10,
        image: 'http://example.com/image.jpg',
        category: 'moda'
    };

    it('Login de vendedor', async () => {
        const res = await requesting
        .post('/api/users/login')
        .send({ email: 'vendedor@email.com', password: 'Vendedor!123' });
        expect(res.body.token).toBeDefined();
        global.sellerToken = res.body.token;

    });
    
    it('Deve cadastrar um novo produto', async () => {
        const res = await requesting
        .post('/api/products')
        .send(product)
        .set('Authorization', `Bearer ${global.sellerToken}`);
        expect(res.statusCode).toBe(201);
        global.createdProductId = res.body._id;
    });
    
    it('Deve listar todos os produtos', async () => {
        const res = await requesting
        .get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.productsWithAverage)).toBe(true);
    });

    it('Deve obter um produto por ID', async () => {
        const res = await requesting
        .get(`/api/products/${global.createdProductId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(global.createdProductId);
    });

    it ('Tentativa de cadastrar produto sem campos obrigatórios', async () => {
        const res = await requesting
        .post('/api/products')
        .send({ title: 'Produto Incompleto' })
        .set('Authorization', `Bearer ${global.sellerToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it('tentativa de visualizar produto inexistente', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await requesting
        .get(`/api/products/${fakeId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Produto não encontrado');
    });

});

describe('Fluxo de compra de Produto', () => {
    it('Usuário adiciona ao carrinho', async () => {
        const res = await requesting
        .post('/api/cart/add')
        .send({
            productId: global.createdProductId,
            quantity: 2
        })
        .set('Authorization', `Bearer ${global.userToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Produto adicionado ao carrinho.');
        global.testOrderId = res.body.cart._id;
    });

    it('Usuário visualiza carrinho', async () => {
        const res = await requesting
        .get('/api/cart')
        .set('Authorization', `Bearer ${global.userToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.items)).toBe(true);
    });

    it('Confirma pedido do carrinho', async () => {
        const res = await requesting
        .post('/api/orders/checkout')
        .send({
            cartId: global.testOrderId,
            shippingAddress: 'Rua Teste, 123',
            paymentMethod: 'cartao'
        })
        .set('Authorization', `Bearer ${global.userToken}`);
        
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Pedido realizado com sucesso.');
        expect(res.body.order).toBeDefined();
        global.testOrderId = res.body.order._id;
    });

    it ('Dados inválidos para comprar', async () => {
        const res = await requesting
        .post('/api/payments/checkout')
        .send({
            orderId: global.testOrderId,
            cardNumber: '1234',
            cvv: '12',
            cpf: '1234567890',
            cep: '1234567'
        })
        .set('Authorization', `Bearer ${global.userToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/deve ter exatamente/);
        expect(res.body.success).toBe(false);
    });


    it ('Terminar compra', async () => {
        const res = await requesting
        .post('/api/payments/checkout')
        .send({
            orderId: global.testOrderId,
            cardNumber: '1234567812345678',
            cvv: '123',
            cpf: '12345678901',
            cep: '12345678'
        })
        .set('Authorization', `Bearer ${global.userToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Pagamento aprovado (simulado).');
    });

    it('Adicionar mais do que o estoque disponível', async () => {
        const res = await requesting
        .post('/api/cart/add')
        .send({
            productId: global.createdProductId,
            quantity: 100
        })
        .set('Authorization', `Bearer ${global.userToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch('Quantidade solicitada excede o estoque disponível.');
    });
});