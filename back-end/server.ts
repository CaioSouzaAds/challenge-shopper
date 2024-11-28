import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import { AppDataSource } from "./src/config/dataSource";

const PORT = process.env.PORT || 4000;

// Inicializar o banco de dados e o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log("Frontend está acessível em http://localhost:80");
      console.log(`Backend está acessível em http://localhost:8080`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
