'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    static associate(models) {
      // Definir la asociación con el modelo Usuario
      Assignment.belongsTo(models.Usuario, { foreignKey: 'idUser', as: 'Usuario' });
      // Definir la asociación con el modelo Block
      Assignment.belongsTo(models.Block, { foreignKey: 'idBlock', as: 'Block' });
      
    }
  }

  Assignment.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false, // Puedes especificar si el campo es obligatorio
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false, // Campo obligatorio
        references: {
          model: 'Usuarios', // Nombre de la tabla de referencia
          key: 'id', // Clave primaria de la tabla de referencia
        },
      },
      idBlock: {
        type: DataTypes.INTEGER,
        allowNull: false, // Campo obligatorio
        references: {
          model: 'Blocks', // Nombre de la tabla de referencia
          key: 'idBlock', // Clave primaria de la tabla de referencia
        },
      },
      dateRegister: {
        type: DataTypes.DATE,
        allowNull: false, // Campo obligatorio
        defaultValue: DataTypes.NOW, // Establece la fecha actual por defecto
      },
    },
    {
      sequelize,
      modelName: 'Assignment',
      tableName: 'assignment', // Nombre explícito de la tabla en la base de datos
      timestamps: true, // Si utilizas campos createdAt y updatedAt
    }
  );

  return Assignment;
};
