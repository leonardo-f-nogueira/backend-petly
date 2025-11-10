// Este arquivo cuida da lógica de Solicitações de Interesse

const { SolicitacaoInteresse, Animal, Usuario, Abrigo } = require('../models');

// --- Usuário (Adotante) cria uma nova solicitação ---
exports.criarSolicitacao = async (req, res) => {
  const usuarioId = req.user.id;
  const { animalId, type } = req.body;

  // 1. Validação
  if (req.user.tipo !== 'usuario') {
    return res.status(403).json({ erro: "Apenas usuários podem fazer solicitações." });
  }
  if (!animalId || !type) {
    return res.json({ erro: "Campos obrigatórios (animalId, type) não preenchidos!" });
  }

  // 2. Lógica de Criação
  try {
    const novaSolicitacao = await SolicitacaoInteresse.create({
      usuarioId: usuarioId,
      animalId: animalId,
      type: type,
      status: 'Pendente' // O status sempre começa como pendente
    });

    return res.status(201).json(novaSolicitacao);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao criar solicitação." });
  }
};

// --- Abrigo lista as solicitações que recebeu ---
exports.listarSolicitacoesDoAbrigo = async (req, res) => {
  const abrigoId = req.user.id;

  // 1. Validação
  if (req.user.tipo !== 'abrigo') {
    return res.status(403).json({ erro: "Apenas abrigos podem ver suas solicitações." });
  }

  // 2. Lógica de Busca
  try {
    const solicitacoes = await SolicitacaoInteresse.findAll({
      where: { status: 'Pendente' }, // Puxa só as pendentes
      include: [
        {
          model: Animal,
          as: 'animal',
          where: { abrigoId: abrigoId }, // filtra só animais DO abrigo logado
          attributes: ['id', 'name', 'photoUrl'] // Puxa só os dados úteis do animal
        },
        {
          model: Usuario,
          as: 'usuario',
          // Puxa os dados de contato que a ONG precisa (como você pediu!)
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

// --- Abrigo atualiza uma solicitação (Aprova/Rejeita) ---
exports.atualizarSolicitacao = async (req, res) => {
  const { id } = req.params; // ID da *Solicitação*
  const { status } = req.body; // Novo status: "Aprovado" ou "Rejeitado"
  const abrigoId = req.user.id; // ID do abrigo logado

  // 1. Validação
  if (!status) {
    return res.json({ erro: "Campo obrigatório (status) não preenchido!" });
  }

  try {
    // 2. Busca a solicitação
    const solicitacao = await SolicitacaoInteresse.findByPk(id, {
      include: [{ model: Animal, as: 'animal' }] // Inclui o animal para checar o dono
    });

    if (!solicitacao) {
      return res.status(404).json({ erro: "Solicitação não encontrada!" });
    }

    // 3. Checagem de Segurança (Estilo do Professor)
    // O abrigo logado é o dono do animal dessa solicitação?
    if (solicitacao.animal.abrigoId !== abrigoId) {
      return res.status(403).json({ erro: "Acesso negado. Esta solicitação não pertence a um animal do seu abrigo." });
    }

    // 4. Atualiza o status
    await solicitacao.update({ status: status });

    return res.json(solicitacao); // Retorna a solicitação atualizada

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Falha ao atualizar solicitação." });
  }
};