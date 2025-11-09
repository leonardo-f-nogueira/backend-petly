const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");

const app = express();

// --- Middlewares Essenciais ---

// 1. Habilita o CORS (Cross-Origin Resource Sharing)
app.use(cors());

// 2. Habilita o Express para "entender" JSON no body das requisições

app.use(express.json());

// --- Rota de Teste ---

app.get("/", (req, res) => {
  res.json({
    message: "API Petly rodando!",
  });
});

//Fala para o app para usar o arquivo de rotas de autenticação
app.use("/auth", authRoutes);
app.use("/animais", animalRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
