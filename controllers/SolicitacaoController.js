//Lógica de solicitações de interesse

const { SolicitacaoInteresse, Animal, Usuario } = require("../models");

exports.criarSolicitacao = async (req, res) => {
  const usuarioId = req.user.id;
  const { petId, tipo, ...outrosDados } = req.body;

  if (req.user.tipo !== "usuario") {
    return res
      .status(403)
      .json({ erro: "Apenas usuários podem fazer solicitações." });
  }

  if (!petId || !tipo) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios (petId, tipo) não preenchidos!" });
  }

  try {
    const dadosSolicitacao = {
      usuarioId: usuarioId,
      animalId: petId,
      type: tipo,
      status: "Pendente",
    };

    if (tipo === "adotar") {
      dadosSolicitacao.tipoResidencia = outrosDados.tipoResidencia;
      dadosSolicitacao.experienciaComPets = outrosDados.experienciaComPets;
    } else if (tipo === "apadrinhar") {
      dadosSolicitacao.valorContribuicao = outrosDados.valorContribuicao;
      dadosSolicitacao.tipoSuporte = outrosDados.tipoSuporte;
      dadosSolicitacao.frequencia = outrosDados.frequencia;
    }

    const novaSolicitacao = await SolicitacaoInteresse.create(dadosSolicitacao);

    return res.status(201).json(novaSolicitacao);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ erro: error.errors.map((e) => e.message).join(", ") });
    }
    return res
      .status(500)
      .json({ erro: "Falha interna ao criar solicitação." });
  }
};

exports.listarSolicitacoesDoAbrigo = async (req, res) => {
  const abrigoId = req.user.id;

  if (req.user.tipo !== "abrigo") {
    return res
      .status(403)
      .json({ erro: "Apenas abrigos podem ver suas solicitações." });
  }

  try {
    const solicitacoes = await SolicitacaoInteresse.findAll({
      where: { status: "Pendente" },
      include: [
        {
          model: Animal,
          as: "animal",
          where: { abrigoId: abrigoId },
          attributes: ["id", "name", "photoUrl"],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "name", "email", "phone", "location"],
        },
      ],
    });

    return res.json(solicitacoes);
  } catch (error) {
    return res.status(500).json({ erro: "Falha ao listar solicitações." });
  }
};

exports.atualizarStatusSolicitacao = async (req, res) => {
  const abrigoId = req.user.id;
  const { id } = req.params;
  const { status } = req.body;

  if (!["Aprovado", "Rejeitado"].includes(status)) {
    return res
      .status(400)
      .json({ erro: "Status inválido. Use 'Aprovado' ou 'Rejeitado'." });
  }

  try {
    const solicitacao = await SolicitacaoInteresse.findOne({
      where: { id: id },
      include: [
        {
          model: Animal,
          as: "animal",
          where: { abrigoId: abrigoId },
        },
      ],
    });

    if (!solicitacao) {
      return res.status(404).json({ erro: "Solicitação não encontrada." });
    }

    if (solicitacao.status !== "Pendente") {
      return res.status(400).json({
        erro: `Esta solicitação já foi ${solicitacao.status.toLowerCase()}.`,
      });
    }

    solicitacao.status = status;
    await solicitacao.save();

    return res.json({
      mensagem: `Solicitação marcada como ${status} com sucesso!`,
      solicitacao,
    });
  } catch (error) {
    return res.status(500).json({ erro: "Falha ao processar a solicitação." });
  }
};