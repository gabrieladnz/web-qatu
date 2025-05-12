# Etapa 1: Build da aplicação Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala somente as dependências de produção
RUN npm install --production

# Copia o restante da aplicação
COPY . .


# Etapa 2: Criar imagem final enxuta para produção
FROM node:20-alpine

WORKDIR /app

# Copia do builder as dependências e código
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Define a porta exposta pelo container
EXPOSE 5000

# Comando para iniciar o backend
CMD ["node", "app.js"]
