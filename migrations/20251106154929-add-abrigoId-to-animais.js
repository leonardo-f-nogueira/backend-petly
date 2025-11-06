// Esta migração adiciona a coluna 'abrigoId' na tabela 'Animais'.
// Isso permite conectar um Animal a um Abrigo.

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Animais', // Nome da tabela que vai ser modificada
      'abrigoId', // Nome da nova coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'Abrigos', key: 'id' }, // Diz que se refere à 'id' da tabela 'Abrigos'
        onUpdate: 'CASCADE', // Se o ID do abrigo mudar, muda aqui também
        onDelete: 'SET NULL', // Se o abrigo for deletado, o animal fica "NULL" (órfão), não é deletado junto
        allowNull: true, // Permite que a coluna seja nula (temporariamente, ou se o abrigo for deletado)
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Animais', 'abrigoId');
  }
};