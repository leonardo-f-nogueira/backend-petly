// Este é o arquvio principal do servidor Petly
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const solicitacaoRoutes = require("./routes/solicitacaoRoutes")

const app = express();

// --- Middlewares Essenciais ---

// Habilita o CORS
app.use(cors());
// Habilita o Express para entender JSON no body das requisições
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "API Petly rodando!",
  });
});


app.use("/auth", authRoutes);
app.use("/animais", animalRoutes);
app.use("/solicitacoes", solicitacaoRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});