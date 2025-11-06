// Este arquivo define o modelo "Usuario"
// Ele representa a tabela 'Usuarios' (adotantes/padrinhos) no banco de dados.

'use strict';
const {
  Model
} = require('sequelize');
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
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};