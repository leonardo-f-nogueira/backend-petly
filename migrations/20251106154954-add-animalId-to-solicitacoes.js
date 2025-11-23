'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'SolicitacaoInteresses',
      'animalId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Animais', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('SolicitacaoInteresses', 'animalId');
  }
};