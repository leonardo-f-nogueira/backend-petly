// Esse arquivo define as rotas de solicitações

const express = require("express");
const router = express.Router();

const SolicitacaoController = require("../controllers/SolicitacaoController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, SolicitacaoController.criarSolicitacao);
router.get(
  "/abrigo",
  verifyToken,
  SolicitacaoController.listarSolicitacoesDoAbrigo
);
router.patch(
  "/:id/status",
  verifyToken,
  SolicitacaoController.atualizarStatusSolicitacao);

module.exports = router;
