'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si existen registros
    const existingCourseBlock = await queryInterface.rawSelect('courseBlock', {
      where: {
        idCourse: 1,
        idBlock: 1
      }
    }, ['id']);

    const existingCourseBlock2 = await queryInterface.rawSelect('courseBlock', {
      where: {
        idCourse: 2,
        idBlock: 2
      }
    }, ['id']);

    // Si alguno ya existe, no hacemos nada
    if (existingCourseBlock || existingCourseBlock2) {
      return;
    }

    // Inserción masiva
    await queryInterface.bulkInsert('courseBlock', [
      {
        idCourse: 1,
        idBlock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idCourse: 2,
        idBlock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros insertados
    await queryInterface.bulkDelete('courseBlock', {
      idCourse: [1, 2],
      idBlock: [1, 2]
    });
  }
};
