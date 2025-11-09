// Este arquivo cuida da lógica de Animais (CRUD)

// Importa os modelos
const { Animal, Abrigo } = require('../models');

// --- Listar TODOS os Animais ---
exports.listarAnimais = async (req, res) => {
  try {
    const animais = await Animal.findAll({
      // Vamos incluir os dados do Abrigo junto com cada animal
      include: [{
        model: Abrigo,
        as: 'abrigo', // 'as: abrigo' deve ser o mesmo alias que definimos no model 'animal.js'
        attributes: ['id', 'name', 'phone', 'address'] // Só pega os dados públicos do abrigo
      }],
      where: { status: 'Disponível' } // Filtra só os disponíveis
    });

    return res.json(animais);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao listar animais." });
  }
};

// --- Listar UM Animal (PÚBLICO) ---
exports.buscarAnimalPorId = async (req, res) => {
  const { id } = req.params; // Pega o ID da URL (ex: /animais/5)

  try {
    const animal = await Animal.findByPk(id, {
      include: [{
        model: Abrigo,
        as: 'abrigo',
        attributes: ['id', 'name', 'phone', 'address', 'socialNetwork'] 
      }]
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

//
// --- ROTAS PROTEGIDAS (Vamos fazer no Dia 7) ---
//

exports.cadastrarAnimal = async (req, res) => {
  // TODO: Implementar Dia 7
  return res.json({ message: "Rota de cadastrar animal - A Fazer" });
};

exports.atualizarAnimal = async (req, res) => {
  // TODO: Implementar Dia 7
  return res.json({ message: "Rota de atualizar animal - A Fazer" });
};

exports.removerAnimal = async (req, res) => {
  // TODO: Implementar Dia 7
  return res.json({ message: "Rota de remover animal - A Fazer" });
};

exports.listarAnimaisDoAbrigo = async (req, res) => {
  // TODO: Implementar Dia 7
  return res.json({ message: "Rota de listar animais do abrigo - A Fazer" });
};