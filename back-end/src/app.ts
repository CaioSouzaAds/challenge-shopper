import express from "express";
import cors from "cors";
import "reflect-metadata";
import { jsonBodyParser } from "./middlewares/jsonErrorHandler";
import router from "./routes";

const app = express();

// Configuração de CORS
app.use(
  cors({
    origin: "*", // Permite todas as origens temporariamente
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

// Configuração de middlewares
app.use(jsonBodyParser);

// Registro de rotas
router(app);

// Rota principal para verificação
app.get("/", (req, res) => {
  res.send("Hello from Challenge Shopper!");
});

export default app;
