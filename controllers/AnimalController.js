// Este arquivo cuida da lógica de Animais (CRUD)

const { Animal, Abrigo } = require("../models");

// --- Listar TODOS os Animais ---
exports.listarAnimais = async (req, res) => {
  try {
    const { species, age, size, gender } = req.query;
    const filtros = { status: "Disponível" };

    if (species) {
      filtros.species = species;
    }
    if (age) {
      filtros.age = age;
    }
    if (size) {
      filtros.size = size;
    }
    if (gender) {
      filtros.gender = gender;
    }

    const animais = await Animal.findAll({
      where: filtros,
      include: [
        {
          model: Abrigo,
          as: "abrigo",
          attributes: ["id", "name", "phone"],
        },
      ],
    });

    return res.json(animais);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao listar animais." });
  }
};

// --- Listar UM Animal ---
exports.buscarAnimalPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await Animal.findByPk(id, {
      include: [
        {
          model: Abrigo,
          as: "abrigo",
          attributes: ["id", "name", "phone", "socialNetwork"],
        },
      ],
    });
    if (!animal) {
      return res.status(404).json({ erro: "Animal não encontrado!" });
    }
    return res.json(animal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao buscar animal." });
  }
};

// --- Cadastrar Animal ---
exports.cadastrarAnimal = async (req, res) => {
  const {
    name,
    species,
    breed,
    age,
    size,
    gender,
    description,
    status,
    behavior,
    healthIssues,
    photoUrl,
  } = req.body;

  const abrigoId = req.user.id;

  if (!name || !species || !age || !size || !gender || !photoUrl) {
    return res.json({
      erro: "Campos obrigatórios (Nome, Espécie, Idade, Porte, Gênero, Foto) não preenchidos!",
    });
  }

  try {
    const novoAnimal = await Animal.create({
      name,
      species,
      breed,
      age,
      size,
      gender,
      description,
      status: status || "Disponível",
      behavior,
      healthIssues,
      photoUrl,
      abrigoId: abrigoId,
    });
    return res.status(201).json(novoAnimal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao cadastrar animal." });
  }
};

// --- Atualizar Animal ---
exports.atualizarAnimal = async (req, res) => {
  const { id } = req.params;
  const abrigoId = req.user.id;
  const {
    name,
    species,
    breed,
    age,
    size,
    gender,
    description,
    status,
    behavior,
    healthIssues,
    photoUrl,
  } = req.body;

  try {
    const animal = await Animal.findOne({
      where: { id: id, abrigoId: abrigoId },
    });

    if (!animal) {
      return res
        .status(404)
        .json({ erro: "Animal não encontrado ou não pertence a este abrigo!" });
    }

    await animal.update({
      name,
      species,
      breed,
      age,
      size,
      gender,
      description,
      status,
      behavior,
      healthIssues,
      photoUrl,
    });

    return res.json(animal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao atualizar animal." });
  }
};

// --- Remover Animal ---
exports.removerAnimal = async (req, res) => {
  const { id } = req.params;
  const abrigoId = req.user.id;

  try {
    const animal = await Animal.findOne({
      where: { id: id, abrigoId: abrigoId },
    });

    if (!animal) {
      return res
        .status(404)
        .json({ erro: "Animal não encontrado ou não pertence a este abrigo!" });
    }

    await animal.destroy();

    return res.json({ mensagem: "Animal removido com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao remover animal." });
  }
};
