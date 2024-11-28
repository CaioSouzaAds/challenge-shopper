FROM node:18

WORKDIR /app

# Copia os arquivos de configuração do Node.js
COPY package.json package-lock.json ./

# Instala todas as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Executa o build
RUN npm run build

# Porta do servidor do frontend
EXPOSE 80

# Comando para iniciar o servidor
CMD ["npm", "run", "preview"]
