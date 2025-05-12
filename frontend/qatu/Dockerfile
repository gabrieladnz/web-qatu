# Etapa 1: Build da aplicação Angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install htmlparser2@6.1.0
RUN npm install
COPY . . 
RUN npm run build -- --configuration=production --project=qatu

# Etapa 2: Servir com Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*  
COPY --from=builder /app/dist/qatu/browser /usr/share/nginx/html  
COPY nginx.conf /etc/nginx/nginx.conf 
EXPOSE 80  
CMD nginx -g 'daemon off;'