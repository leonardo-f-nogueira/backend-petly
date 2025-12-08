// Arquivo da tabela Abrigos (ONG/Abrigo) no BD.
"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Abrigo extends Model {
    static associate(models) {
      this.hasMany(models.Animal, { foreignKey: "abrigoId", as: "animais" });
    }
  }
  Abrigo.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      photoUrl: DataTypes.TEXT,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      activityTime: DataTypes.STRING,
      associationData: DataTypes.STRING,
      socialNetwork: DataTypes.STRING,
      animalCount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      questionnaireData: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Abrigo",
      tableName: "Abrigos",
      hooks: {
        beforeCreate: async (abrigo) => {
          if (abrigo.password) {
            const salt = await bcrypt.genSalt(10);
            abrigo.password = await bcrypt.hash(abrigo.password, salt);
          }
        },
      },
    }
  );
  return Abrigo;
};
