// Este arquivo define o modelo "Animal"
// Ele representa a tabela 'Animais' no banco de dados.

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      // Um Animal PERTENCE A UM Abrigo
      this.belongsTo(models.Abrigo, { foreignKey: 'abrigoId', as: 'abrigo' });
      
      // Um Animal TEM MUITAS Solicitações de Interesse
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
  });
  return Animal;
};