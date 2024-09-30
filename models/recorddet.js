'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecordDet extends Model {
    static associate(models) {
      // Corrección aquí, usando 'models' para acceder a 'RecordCab'
      RecordDet.belongsTo(models.RecordCab, { foreignKey: 'idRecordCab', as: 'recordCab' });
    }
  }

  RecordDet.init(
    {
      idRecordCab: {
        type: DataTypes.INTEGER,
        allowNull: false, // Campo obligatorio
        references: {
          model: 'RecordCab', // Nombre de la tabla de referencia
          key: 'idRecordCab',   // Clave primaria de la tabla de referencia
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RecordDet',
      tableName: 'recordDet', // Nombre explícito de la tabla en la base de datos
      timestamps: true, // Si usas createdAt y updatedAt
    }
  );

  return RecordDet;
};
