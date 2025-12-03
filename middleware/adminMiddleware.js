// Arquivo que verifica se o usuário é admin
exports.verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ erro: "Acesso negado. Área restrita para administradores." });
  }
  next();
};