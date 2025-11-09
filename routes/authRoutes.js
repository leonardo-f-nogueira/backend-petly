// Este arquivo define as rotas de Autenticação (/auth)

const express = require('express');
const router = express.Router();

// Importa o nosso Controller de Autenticação
const AuthController = require('../controllers/AuthController');

// --- Rotas de Cadastro ---
router.post('/abrigo/cadastro', AuthController.cadastroAbrigo);

router.post('/usuario/cadastro', AuthController.cadastroUsuario);


// --- Rotas de Login (Vamos fazer amanhã) ---
router.post('/abrigo/login', AuthController.loginAbrigo);

router.post('/usuario/login', AuthController.loginUsuario);


// Exporta o roteador para o app principal (index.js) usar
module.exports = router;