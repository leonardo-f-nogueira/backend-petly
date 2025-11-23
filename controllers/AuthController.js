// Este arquivo cuida da lógica de Autenticação (Cadastro e Login)

const { Abrigo, Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.cadastroAbrigo = async (req, res) => {
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

  if (!name || !email || !password || !cnpj || !address || !phone) {
    return res.json({
      erro: "Campos obrigatórios (Nome, Email, Senha, CNPJ, Endereço, Telefone) não preenchidos!",
    });
  }

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

exports.cadastroUsuario = async (req, res) => {
  const { name, email, password, location, phone } = req.body;

  if (!name || !email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Nome, Email, Senha) não preenchidos!",
    });
  }

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

exports.loginAbrigo = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Email, Senha) não preenchidos!",
    });
  }

  try {
    const abrigo = await Abrigo.findOne({ where: { email } });

    if (!abrigo) {
      return res.status(404).json({ erro: "Abrigo não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(password, abrigo.password);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta!" });
    }

    const token = jwt.sign(
      {
        id: abrigo.id,
        email: abrigo.email,
        tipo: "abrigo",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha no login." });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      erro: "Campos obrigatórios (Email, Senha) não preenchidos!",
    });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta!" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipo: "usuario",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha no login." });
  }
};