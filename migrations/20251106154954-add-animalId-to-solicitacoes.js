// Esta migração adiciona a coluna 'animalId' na tabela 'SolicitacaoInteresses'.
// Isso permite conectar uma Solicitação a um Animal.

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'SolicitacaoInteresses', // Nome da tabela
      'animalId', // Nova coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'Animais', key: 'id' }, // Referência à tabela 'Animais'
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Se o animal for deletado, a solicitação fica sem animal
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('SolicitacaoInteresses', 'animalId');
  }
};