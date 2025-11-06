// Este arquivo define o modelo "Abrigo"
// Ele representa a tabela 'Abrigos' (ONGs) no banco de dados.

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abrigo extends Model {
    static associate(models) {
      // Um Abrigo TEM MUITOS Animais
      this.hasMany(models.Animal, { foreignKey: 'abrigoId', as: 'animais' });
    }
  }
  Abrigo.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    activityTime: DataTypes.STRING,
    associationData: DataTypes.STRING,
    socialNetwork: DataTypes.STRING,
    animalCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Abrigo',
  });
  return Abrigo;
};