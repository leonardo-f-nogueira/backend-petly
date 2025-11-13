// Define as rotas dos Animais

const express = require('express');
const router = express.Router();

const AnimalController = require('../controllers/AnimalController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', AnimalController.listarAnimais);
router.get('/:id', AnimalController.buscarAnimalPorId);
router.post('/', verifyToken, AnimalController.cadastrarAnimal);
router.put('/:id', verifyToken, AnimalController.atualizarAnimal);
router.delete('/:id', verifyToken, AnimalController.removerAnimal);

module.exports = router;