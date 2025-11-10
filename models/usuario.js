// Este arquivo define o modelo "Usuario"
// Ele representa a tabela 'Usuarios' (adotantes/padrinhos) no banco de dados.

'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Um Usuario TEM MUITAS Solicitações de Interesse
      this.hasMany(models.SolicitacaoInteresse, { foreignKey: 'usuarioId', as: 'solicitacoes' });
    }
  }
  Usuario.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    // HOOKS: A forma mais segura de adicionar hooks é aqui, nas opções do init
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });
  return Usuario;
};