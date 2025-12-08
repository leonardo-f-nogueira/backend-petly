// Arquivo da tabela usuarios no BD.

"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.SolicitacaoInteresse, {
        foreignKey: "usuarioId",
        as: "solicitacoes",
      });
    }
  }
  Usuario.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      cpf: DataTypes.STRING,
      photoUrl: DataTypes.TEXT,
      type: {
        type: DataTypes.STRING,
        defaultValue: "usuario",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      hooks: {
        beforeCreate: async (usuario) => {
          if (usuario.password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
          }
        },
      },
    }
  );
  return Usuario;
};
