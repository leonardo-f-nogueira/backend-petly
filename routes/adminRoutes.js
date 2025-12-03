// Esse arquivo define as rotas do admin
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/adminMiddleware');

router.get('/ongs-pendentes', verifyToken, verifyAdmin, AdminController.listarOngsPendentes);

router.patch('/ongs/:id/status', verifyToken, verifyAdmin, AdminController.alterarStatusOng);

module.exports = router;