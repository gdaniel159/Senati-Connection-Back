// courseBlock.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseBlock extends Model {
    static associate(models) {
      // Asociaciones de la tabla intermedia
      courseBlock.belongsTo(models.Course, { foreignKey: 'idCourse', as: 'Course' });
      courseBlock.belongsTo(models.Block, { foreignKey: 'idBlock', as: 'Blocks' });
    }
  }

  courseBlock.init(
    {
      idBlock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Blocks', // Debe coincidir con el nombre de la tabla que usa Block
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      idCourse: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses', // Debe coincidir con el nombre de la tabla que usa Course
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'courseBlock',
      tableName: 'courseBlock',
      timestamps: true,
    }
  );

  return courseBlock;
};
