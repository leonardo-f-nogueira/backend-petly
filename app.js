// Este é o arquivo principal do nosso servidor (app.js)
// Ele liga o Express, configura o CORS e escuta por conexões.

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const solicitacaoRoutes = require("./routes/solicitacaoRoutes");

const app = express();

app.use(cors());
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
