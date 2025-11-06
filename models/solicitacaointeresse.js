// Este arquivo define o modelo "SolicitacaoInteresse"
// Ele representa a tabela 'SolicitacaoInteresses' (a "conexão" entre usuário e animal).

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SolicitacaoInteresse extends Model {
    static associate(models) {
      // Uma Solicitação PERTENCE A UM Usuario
      this.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
      
      // Uma Solicitação PERTENCE A UM Animal
      this.belongsTo(models.Animal, { foreignKey: 'animalId', as: 'animal' });
    }
  }
  SolicitacaoInteresse.init({
    type: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SolicitacaoInteresse',
  });
  return SolicitacaoInteresse;
};