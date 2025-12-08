// Verifica se o token possui type 'admin' para liberar acesso às rotas restritas.
exports.verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.type !== "admin") {
    return res
      .status(403)
      .json({ erro: "Acesso negado. Área restrita para administradores." });
  }
  next();
};
