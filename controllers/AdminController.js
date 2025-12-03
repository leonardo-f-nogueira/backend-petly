// Arquivo que lida com as operações administrativas
const { Abrigo } = require("../models");

exports.listarOngsPendentes = async (req, res) => {
  try {
    const ongsPendentes = await Abrigo.findAll({
      where: { status: 'Pendente' },
      attributes: ['id', 'name', 'email', 'phone', 'cnpj', 'questionnaireData', 'createdAt']
    });
    return res.json(ongsPendentes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar ONGs pendentes." });
  }
};

exports.alterarStatusOng = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Aprovado', 'Rejeitado'].includes(status)) {
    return res.status(400).json({ erro: "Status inválido. Use 'Aprovado' ou 'Rejeitado'." });
  }

  try {
    const abrigo = await Abrigo.findByPk(id);
    if (!abrigo) {
      return res.status(404).json({ erro: "ONG não encontrada." });
    }

    abrigo.status = status;
    await abrigo.save();

    return res.json({ message: `Status da ONG alterado para ${status} com sucesso.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar status da ONG." });
  }
};