// Este arquivo representa a tabela 'SolicitacaoInteresses'.

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SolicitacaoInteresse extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
      
      this.belongsTo(models.Animal, { foreignKey: 'animalId', as: 'animal' });
    }
  }
  SolicitacaoInteresse.init({
    type: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SolicitacaoInteresse',
    tableName: 'SolicitacaoInteresses',
  });
  return SolicitacaoInteresse;
};