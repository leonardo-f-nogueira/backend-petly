//Esse arquivo cuida do cadastro e login de abrigos e usuários.

const { Abrigo, Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { cpf: cpfValidator, cnpj: cnpjValidator } = require('cpf-cnpj-validator');

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
    questionnaireData,
  } = req.body;

  if (!name || !email || !password || !cnpj || !address || !phone) {
    return res.status(400).json({
      erro: "Campos obrigatórios (Nome, Email, Senha, CNPJ, Endereço, Telefone) não preenchidos!",
    });
  }

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: "Formato de e-mail inválido." });
    }

    const abrigoExistente = await Abrigo.findOne({ where: { email } });
    if (abrigoExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado para outro abrigo!" });
    }

    if (cnpj) {
        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (!cnpjValidator.isValid(cnpjLimpo)) {
            return res.status(400).json({ erro: "O CNPJ informado é inválido." });
        }

        const cnpjJaExiste = await Abrigo.findOne({ where: { cnpj: cnpjLimpo } });
        if (cnpjJaExiste) {
            return res.status(400).json({ erro: "Este CNPJ já está cadastrado." });
        }
    } else {
        return res.status(400).json({ erro: "O CNPJ é obrigatório." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoAbrigo = await Abrigo.create({
      name,
      email,
      password: hashedPassword,
      cnpj: cnpj.replace(/\D/g, ''),
      address,
      phone,
      activityTime,
      associationData,
      socialNetwork,
      animalCount,
      status: 'Pendente',
      questionnaireData
    });

    novoAbrigo.password = undefined;
    return res.status(201).json(novoAbrigo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Falha ao cadastrar abrigo. Verifique os dados.",
    });
  }
};

exports.cadastroUsuario = async (req, res) => {
  const { name, email, password, location, phone, cpf } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      erro: "Campos obrigatórios (Nome, Email, Senha) não preenchidos!",
    });
  }

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: "Formato de e-mail inválido." });
    }

    let cpfLimpo = null;
    if (cpf) {
        cpfLimpo = cpf.replace(/\D/g, '');

        if (!cpfValidator.isValid(cpfLimpo)) {
            return res.status(400).json({ erro: "O CPF informado é inválido." });
        }

        const cpfJaExiste = await Usuario.findOne({ where: { cpf: cpfLimpo } });
        if (cpfJaExiste) {
            return res.status(400).json({ erro: "Este CPF já está cadastrado." });
        }
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUsuario = await Usuario.create({
      name,
      email,
      password: hashedPassword,
      location,
      phone,
      cpf: cpfLimpo,
    });

    novoUsuario.password = undefined;
    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Falha ao cadastrar usuário.",
    });
  }
};


exports.loginAbrigo = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
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

    if (abrigo.status !== 'Aprovado') {
        const mensagem = abrigo.status === 'Rejeitado'
            ? "Seu cadastro não foi aprovado após análise."
            : "Cadastro em análise. Aguarde o contato da nossa equipe para a visita técnica.";
        return res.status(403).json({ erro: mensagem });
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
    return res.status(400).json({
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
        role: usuario.role,
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