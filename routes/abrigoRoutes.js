// Este arquivo define as rotas de Abrigos (/abrigos)

const express = require('express');
const router = express.Router();

const AbrigoController = require('../controllers/AbrigoController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/meus-animais', verifyToken, AbrigoController.listarMeusAnimais);

router.put('/meu-perfil', verifyToken, AbrigoController.atualizarMeuPerfil);

router.get('/:id', AbrigoController.buscarAbrigoPorId);


module.exports = router;