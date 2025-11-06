// Este é o arquivo principal do nosso servidor.

const express = require("express");
const cors = require("cors");

// Inicializa o Express
const app = express();

// --- Middlewares Essenciais ---

// 1. Habilita o CORS (Cross-Origin Resource Sharing)
// Isso permite que seu frontend React (rodando em localhost:3000)
// possa fazer requisições para o seu backend (rodando em localhost:8080)
app.use(cors());

// 2. Habilita o Express para "entender" JSON no body das requisições

app.use(express.json());

// --- Rota de Teste ---

app.get("/", (req, res) => {
  res.json({
    message: "API Petly rodando!",
  });
});

// --- Porta do Servidor ---
// Define a porta que o servidor vai "escutar"
// Deve ser a mesma que expomos no docker-compose.yml
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
