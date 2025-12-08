// Esse arquivo define as rotas dos animais

const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/AnimalController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/abrigo/meus-pets', verifyToken, AnimalController.listarAnimaisPorAbrigo);

router.get('/', AnimalController.listarAnimais);
router.get('/publico', AnimalController.listarAnimaisPublico);
router.get('/:id', AnimalController.buscarAnimalPorId);
router.post('/', verifyToken, AnimalController.cadastrarAnimal);
router.put('/:id', verifyToken, AnimalController.atualizarAnimal);
router.delete('/:id', verifyToken, AnimalController.removerAnimal);

module.exports = router;