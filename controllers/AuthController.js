// Este arquivo cuida da lógica de Autenticação (Cadastro e Login)
// Padrão de exportação direta de funções.

// Importa os modelos
const { Abrigo, Usuario } = require("../models");
// Importa as ferramentas
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Cadastro de Abrigo ---
exports.cadastroAbrigo = async (req, res) => {
  // Pega os dados do corpo da requisição
  const {
    name,
    email,
    password,
    cnpj,
    address,
    phone,
    activityTime,
    associationData,
    socialNetwork,
    animalCount,
  } = req.body;

  // 1. Validação
  if (!name || !email || !password || !cnpj || !address || !phone) {
    return res.json({
      erro: "Campos obrigatórios (Nome, Email, Senha, CNPJ, Endereço, Telefone) não preenchidos!",
    });
  }

  // 2. Lógica de Criação
  try {
    const novoAbrigo = await Abrigo.create({
      name,
      email,
      password,
      cnpj,
      address,
      phone,
      activityTime,
      associationData,
      socialNetwork,
      animalCount,
    });

    novoAbrigo.password = undefined;
    return res.status(201).json(novoAbrigo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Falha ao cadastrar abrigo. O email ou CNPJ já pode estar em uso.",
    });
  }
};

// --- Cadastro de Usuário ---
exports.cadastroUsuario = async (req, res) => {
  const { name, email, password, location, phone } = req.body;

  // 1. Validação
  if (!name || !email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Nome, Email, Senha) não preenchidos!",
    });
  }

  // 2. Lógica de Criação
  try {
    const novoUsuario = await Usuario.create({
      name,
      email,
      password,
      location,
      phone,
    });

    novoUsuario.password = undefined;
    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Falha ao cadastrar usuário. O email já pode estar em uso.",
    });
  }
};

//
// --- LOGIN DE ABRIGO ---
//
exports.loginAbrigo = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validação de entrada
  if (!email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Email, Senha) não preenchidos!",
    });
  }

  try {
    // 2. Buscar o abrigo pelo email
    const abrigo = await Abrigo.findOne({ where: { email } });

    // 3. Checar se o abrigo existe (Estilo do Professor)
    if (!abrigo) {
      return res.status(404).json({ erro: "Abrigo não encontrado!" });
    }

    // 4. Comparar a senha enviada com a senha criptografada do banco
    const senhaCorreta = await bcrypt.compare(password, abrigo.password);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta!" });
    }

    // 5. Gerar o Token JWT
    const token = jwt.sign(
      {
        id: abrigo.id,
        email: abrigo.email,
        tipo: "abrigo", // Para sabermos que é um abrigo
      },
      process.env.JWT_SECRET, // O segredo que colocamos no docker-compose
      {
        expiresIn: "8h", // Token expira em 8 horas
      }
    );

    // 6. Enviar o token para o front
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha no login." });
  }
};

//
// --- LOGIN DE USUÁRIO ---
//
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validação
  if (!email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Email, Senha) não preenchidos!",
    });
  }

  try {
    // 2. Buscar o usuário
    const usuario = await Usuario.findOne({ where: { email } });

    // 3. Checar se existe
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    // 4. Comparar as senhas
    const senhaCorreta = await bcrypt.compare(password, usuario.password);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta!" });
    }

    // 5. Gerar o Token
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipo: "usuario", // Para sabermos que é um usuário
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    // 6. Enviar o token
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha no login." });
  }
};
