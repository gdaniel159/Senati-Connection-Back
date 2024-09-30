'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {

    static associate(models) {
      Usuario.belongsTo(models.Rol, {foreignKey: 'idRol', as: 'rol'});
    }
  }
  Usuario.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    idRol: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
  });
  return Usuario;
};