// Arquivo da tabela animais no banco.

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      this.belongsTo(models.Abrigo, { foreignKey: 'abrigoId', as: 'abrigo' });
      this.hasMany(models.SolicitacaoInteresse, { foreignKey: 'animalId', as: 'solicitacoes' });
    }
  }
  Animal.init({
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    size: DataTypes.STRING,
    gender: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    behavior: DataTypes.STRING,
    healthIssues: DataTypes.STRING,
    photoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Animal',
    tableName: 'Animais',
  });
  return Animal;
};