// Esse arquivo define as rotas de autenticação(/auth)

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/abrigo/cadastro", AuthController.cadastroAbrigo);
router.post("/usuario/cadastro", AuthController.cadastroUsuario);
router.post("/abrigo/login", AuthController.loginAbrigo);
router.post("/usuario/login", AuthController.loginUsuario);
router.put("/usuario", verifyToken, AuthController.atualizarUsuario);
router.put("/abrigo", verifyToken, AuthController.atualizarAbrigo);

module.exports = router;
