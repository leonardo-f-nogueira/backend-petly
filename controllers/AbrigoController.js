// Este arquivo cuida da lógica de perfis e dados dos Abrigos

const { Abrigo, Animal } = require('../models');

// --- Listar Animais do Abrigo Logado ---
exports.listarMeusAnimais = async (req, res) => {
  const abrigoId = req.user.id;

  try {
    const animais = await Animal.findAll({
      where: { abrigoId: abrigoId }
    });

    return res.json(animais);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao listar animais do abrigo." });
  }
};

// --- Buscar Perfil Público do Abrigo ---
exports.buscarAbrigoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const abrigo = await Abrigo.findByPk(id, {
      // ATENÇÃO: Conforme o requisito, NÃO buscamos o endereço, email ou cnpj
      attributes: ['id', 'name', 'phone', 'activityTime', 'associationData', 'socialNetwork', 'animalCount']
    });

    if (!abrigo) {
      return res.status(404).json({ erro: "Abrigo não encontrado!" });
    }

    return res.json(abrigo);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao buscar perfil do abrigo." });
  }
};

// --- Atualizar o Próprio Perfil ---
exports.atualizarMeuPerfil = async (req, res) => {
  const abrigoId = req.user.id;
  const { 
    name, address, phone, activityTime, 
    associationData, socialNetwork, animalCount 
  } = req.body;

  try {
    const abrigo = await Abrigo.findByPk(abrigoId);

    if (!abrigo) {
      return res.status(404).json({ erro: "Abrigo não encontrado!" });
    }

    await abrigo.update({
      name, address, phone, activityTime, 
      associationData, socialNetwork, animalCount
    });

    abrigo.password = undefined;
    return res.json(abrigo);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao atualizar perfil." });
  }
};