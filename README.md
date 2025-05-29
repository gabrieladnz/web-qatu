# 🛍️ Qatu - E-commerce Platform

## 📖 Sobre o Projeto

Qatu é uma plataforma de e-commerce desenvolvida para proporcionar uma experiência de compra acessível, segura e personalizada. O sistema permite que usuários explorem um catálogo de produtos, realizem pedidos e acompanhem suas compras, além de possibilitar que vendedores gerenciem seus produtos e vendas.

### 🎯 Principais Funcionalidades

- Autenticação e gestão de usuários
- Catálogo de produtos com filtros e busca
- Sistema de carrinho de compras
- Gestão de pedidos
- Sistema de avaliações
- Notificações em tempo real
- Área do vendedor
- Simulação de pagamentos

## 🔧 Tecnologias Utilizadas

### Backend

- Node.js + Express
- MongoDB (banco de dados)
- JWT para autenticação
- Bcrypt para criptografia
- Cloudinary para imagens
- Jest para testes

### Frontend

- Angular 19.2
- Angular Material
- TypeScript
- SCSS
- Angular Router
- HTTPClient

### DevOps

- Docker
- GitLab CI/CD
- Railway (deploy backend)
- Vercel (deploy frontend)

## 🏗️ Arquitetura

### Backend (Node.js + Express)

```
backend/
├── controllers/    # Lógica de negócios
├── models/        # Schemas MongoDB
├── routes/        # Rotas da API
├── services/      # Serviços
├── middlewares/   # Middlewares
├── utils/         # Utilitários
└── config/        # Configurações
```

### Frontend (Angular)

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/      # Serviços e guards
│   │   ├── pages/     # Componentes de página
│   │   ├── shared/    # Componentes compartilhados
│   │   └── features/  # Módulos de funcionalidades
│   ├── assets/        # Recursos estáticos
│   └── styles/        # Estilos globais
```

## 📚 Documentação da API

### Autenticação

- POST /api/users/register - Registro de usuário
- POST /api/users/login - Login
- POST /api/users/reset-password - Reset de senha
- PATCH /api/users/:id/become-seller - Tornar-se vendedor

### Produtos

- GET /api/products - Lista produtos (com filtros)
- GET /api/products/:id - Detalhes do produto
- POST /api/products - Criar produto (vendedor)
- PUT /api/products/:id - Atualizar produto
- DELETE /api/products/:id - Remover produto
- POST /api/products/:id/review - Adicionar avaliação

### Carrinho

- POST /api/cart/add - Adicionar ao carrinho
- GET /api/cart - Ver carrinho
- DELETE /api/cart/remove - Remover do carrinho

### Pedidos

- POST /api/orders/checkout - Finalizar compra
- GET /api/orders/my-orders - Meus pedidos
- GET /api/orders/seller-orders - Pedidos (vendedor)
- PATCH /api/orders/:id/status - Atualizar status

### Notificações

- GET /api/notifications - Listar notificações
- PATCH /api/notifications/:id/read - Marcar como lida
- DELETE /api/notifications - Limpar notificações

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 18
- MongoDB
- Angular CLI
- Docker (opcional)

### Backend

```bash
cd backend/qatu
npm install
npm run dev
```

### Frontend

```bash
cd frontend/qatu
npm install
ng serve
```

### Docker

```bash
# Backend
docker-compose -f docker-compose.backend.yml up

# Frontend
docker-compose -f docker-compose.frontend.yml up
```

## 👥 Papéis de Usuário

### Comprador (Buyer)

- Navega por produtos
- Realiza compras
- Avalia produtos
- Gerencia carrinho
- Acompanha pedidos

### Vendedor (Seller)

- Gerencia produtos próprios
- Acompanha vendas
- Atualiza status de pedidos
- Recebe notificações

## 🔐 Segurança

- Autenticação via JWT
- Senhas criptografadas (bcrypt)
- Validação de dados
- Proteção de rotas
- Controle de acesso por role

## 📱 Features de UX

- Design responsivo
- Feedback visual de ações
- Notificações em tempo real
- Filtros e busca avançada
- Paginação de resultados
- Gestão de estados de loading

## 🧪 Testes

- Testes unitários (Jest)
- Testes de API (Postman)
- Testes de integração
- Validações de frontend

## 👨‍💻 Equipe

- **Gabriela Diniz Santos** - Frontend + Integração (Líder + Designer)
- **Marcelo Barbosa da Silva** - Banco de Dados
- **Pedro Henrique Aguiar de Medeiros** - Backend (Scrum Master)
- **Pedro Lucas Valadares Ferreira** - Backend (Líder)
- **Renato Sá Leitão de Carvalho Filho** - Frontend + Integração (Designer)

## 📈 Próximos Passos

- Implementação de cache
- Melhorias de performance
- Expansão de testes
- PWA features
- Relatórios e analytics
