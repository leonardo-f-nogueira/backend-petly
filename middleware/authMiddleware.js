// Este arquivo define o nosso "segurança" da API.
// É um middleware que verifica se o usuário enviou um Token JWT válido.

const jwt = require('jsonwebtoken');

// Exportar a função diretamente
exports.verifyToken = (req, res, next) => {
  // 1. Buscar o token. Ele vem no cabeçalho (header) 'Authorization'.
  const authHeader = req.headers['authorization'];

  // O formato do header é "Bearer TOKEN_GIGANTE"
  // Nós separamos a palavra "Bearer" do token em si.
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Checar se o token existe
  if (!token) {
    return res.status(401).json({ erro: "Acesso negado. Você precisa estar logado." });
  }

  // 3. Checar se o token é válido
  try {
    // Tenta verificar o token usando o nosso segredo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Se deu certo, o 'decoded' contém os dados que colocamos no token (id, email, tipo)
    // Nós "penduramos" esses dados na requisição (req) para os controllers usarem depois.
    req.user = decoded; // Agora, todo controller pode saber quem é o usuário logado

    // O 'next()' é a palavra-chave que diz: "Ok, o usuário é válido. Pode passar."
    next();

  } catch (error) {
    // Se o token for inválido
    return res.status(400).json({ erro: "Token inválido." });
  }
};