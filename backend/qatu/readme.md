# Documentação do Backend - Qatu

## Índice
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Estrutura](#estrutura)
- [Troubleshooting](#troubleshooting)

## Requisitos <a name="requisitos"></a>

| Software       | Versão Mínima | Comando de Verificação |
|----------------|---------------|------------------------|
| Node.js        | 18.x          | `node -v`              |
| npm            | 9.x           | `npm -v`               |
| MongoDB        | 6.0           | `mongod --version`     |

## Instalação <a name="instalação"></a>

```bash
# Clone o repositório
git clone https://gitlab.com/seu-projeto.git
cd backend/qatu

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env


Execução <a name="execução"></a>
Comando	Descrição
npm run dev	Inicia em modo desenvolvimento
npm start	Inicia em produção
npm test	Executa testes unitários
npm run lint	Verifica qualidade do código

Estrutura <a name="estrutura"></a>
src/
├── controllers/    # Lógica das rotas
├── models/         # Schemas do MongoDB
├── routes/         # Definição de endpoints
├── middlewares/    # Autenticação/Validação
├── config/         # Configurações globais
├── app.js          # Config Express
└── index.js        # Entry point


