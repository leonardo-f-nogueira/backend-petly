// Esta migração adiciona a coluna 'usuarioId' na tabela 'SolicitacaoInteresses'.
// Isso permite conectar uma Solicitação a um Usuário.

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'SolicitacaoInteresses', // Nome da tabela
      'usuarioId', // Nova coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' }, // Referência à tabela 'Usuarios'
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Se o usuário for deletado, a solicitação fica sem dono
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('SolicitacaoInteresses', 'usuarioId');
  }
};