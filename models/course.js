// course.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Course.hasMany(models.Assignment, {foreignKey: 'idCourse', as: 'Assignment'})

      // Asociación muchos a muchos con Block a través de courseBlock
      Course.belongsToMany(models.Block, {
        through: models.courseBlock,
        foreignKey: 'idCourse',
        otherKey: 'idBlock',
        as: 'Blocks'
      });
    }
  }
  Course.init(
    { description: DataTypes.STRING,initials: DataTypes.STRING },
    { sequelize, modelName: 'Course' }
  );
  return Course;
};
