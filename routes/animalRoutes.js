// Este arquivo define as rotas de Animais (/animais)

const express = require('express');
const router = express.Router();

// Importa o "Cérebro" (Controller)
const AnimalController = require('../controllers/AnimalController');
// Importa o "Segurança" (Middleware)
const { verifyToken } = require('../middleware/authMiddleware');

// --- ROTAS PÚBLICAS (Não precisam de login) ---

// [GET] /animais
router.get('/', AnimalController.listarAnimais);

// [GET] /animais/:id
router.get('/:id', AnimalController.buscarAnimalPorId);

// --- ROTAS PROTEGIDAS (Precisam de login de ABRIGO) ---
// (Vamos implementar a lógica no Dia 7)

// [POST] /animais
router.post('/', verifyToken, AnimalController.cadastrarAnimal);

// [PUT] /animais/:id
router.put('/:id', verifyToken, AnimalController.atualizarAnimal);

// [DELETE] /animais/:id
router.delete('/:id', verifyToken, AnimalController.removerAnimal);

module.exports = router;