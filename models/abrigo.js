'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abrigo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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