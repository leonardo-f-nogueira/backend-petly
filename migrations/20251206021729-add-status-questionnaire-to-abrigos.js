'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Abrigos', 'status', { type: Sequelize.STRING, defaultValue: 'Pendente', allowNull: false });
    await queryInterface.addColumn('Abrigos', 'questionnaireData', { type: Sequelize.TEXT, allowNull: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Abrigos', 'status');
    await queryInterface.removeColumn('Abrigos', 'questionnaireData');
  }
};