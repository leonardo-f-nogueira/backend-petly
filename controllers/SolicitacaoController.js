// Lógica de Solicitações de Interesse

const { SolicitacaoInteresse, Animal, Usuario } = require('../models');

exports.criarSolicitacao = async (req, res) => {
  const usuarioId = req.user.id;
  const { animalId, type } = req.body;

  if (req.user.tipo !== 'usuario') {
    return res.status(403).json({ erro: "Apenas usuários podem fazer solicitações." });
  }
  if (!animalId || !type) {
    return res.json({ erro: "Campos obrigatórios (animalId, type) não preenchidos!" });
  }

  try {
    const novaSolicitacao = await SolicitacaoInteresse.create({
      usuarioId: usuarioId,
      animalId: animalId,
      type: type,
      status: 'Pendente'
    });

    return res.status(201).json(novaSolicitacao);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao criar solicitação." });
  }
};

exports.listarSolicitacoesDoAbrigo = async (req, res) => {
  const abrigoId = req.user.id;

  if (req.user.tipo !== 'abrigo') {
    return res.status(403).json({ erro: "Apenas abrigos podem ver suas solicitações." });
  }

  try {
    const solicitacoes = await SolicitacaoInteresse.findAll({
      where: { status: 'Pendente' },
      include: [
        {
          model: Animal,
          as: 'animal',
          where: { abrigoId: abrigoId },
          attributes: ['id', 'name', 'photoUrl']
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'name', 'email', 'phone', 'location'] 
        }
      ]
    });

    return res.json(solicitacoes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao listar solicitações." });
  }
};