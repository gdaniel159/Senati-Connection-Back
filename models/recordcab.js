'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecordCab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con el modelo Course
      RecordCab.belongsTo(models.Course, { foreignKey: 'idCourse', as: 'course' });
      // Asociación con el modelo RecordDet
      RecordCab.hasMany(models.RecordDet, { foreignKey: 'idRecordCab', as: 'recordDet' });
    }
  }

  RecordCab.init(
    {
      idCourse: {
        type: DataTypes.INTEGER,
        allowNull: false, // Campo obligatorio
        references: {
          model: 'Courses', // Nombre de la tabla de referencia
          key: 'idCourse', // Clave primaria de la tabla de referencia
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, // Puedes cambiar a false si es obligatorio
      },
    },
    {
      sequelize,
      modelName: 'RecordCab',
      tableName: 'recordCab', // Nombre explícito de la tabla en la base de datos
      timestamps: true, // Si utilizas campos createdAt y updatedAt
    }
  );

  return RecordCab;
};
