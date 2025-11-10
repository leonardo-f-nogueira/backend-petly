// Este arquivo define as rotas de Solicitações de Interesse

const express = require('express');
const router = express.Router();

const SolicitacaoController = require('../controllers/SolicitacaoController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, SolicitacaoController.criarSolicitacao);

router.get('/abrigo', verifyToken, SolicitacaoController.listarSolicitacoesDoAbrigo);

router.patch('/:id', verifyToken, SolicitacaoController.atualizarSolicitacao);

module.exports = router;