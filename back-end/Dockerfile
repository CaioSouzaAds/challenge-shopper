FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run clean && npm run build

# Expose the application port
EXPOSE 4000

# Run the server using the generated file
CMD ["node", "build/server.js"]
