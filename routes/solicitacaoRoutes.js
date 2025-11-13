// Define as rotas de Solicitações (/solicitacoes)

const express = require('express');
const router = express.Router();

const SolicitacaoController = require('../controllers/SolicitacaoController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, SolicitacaoController.criarSolicitacao);
router.get('/abrigo', verifyToken, SolicitacaoController.listarSolicitacoesDoAbrigo);

module.exports = router;