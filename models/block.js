// block.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    static associate(models) {
      Block.hasMany(models.Assignment, {foreignKey: 'idBlock', as: 'Assignment'})

      // Asociación muchos a muchos con Course a través de courseBlock
      Block.belongsToMany(models.Course, {
        through: models.courseBlock,
        foreignKey: 'idBlock',
        otherKey: 'idCourse',
        as: 'Courses'
      });
    }

  }
  Block.init(
    { description: DataTypes.STRING },
    { sequelize, modelName: 'Block' }
  );
  return Block;
};
