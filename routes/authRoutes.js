// Esse arquivo define as rotas de Autenticação (/auth)

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/abrigo/cadastro', AuthController.cadastroAbrigo);
router.post('/usuario/cadastro', AuthController.cadastroUsuario);

router.post('/abrigo/login', AuthController.loginAbrigo);
router.post('/usuario/login', AuthController.loginUsuario);

module.exports = router;