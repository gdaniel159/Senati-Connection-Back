'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si existen los cursos
    const existingCourse = await queryInterface.rawSelect('Courses', {
      where: {
        description: "Desarrollo de apps Moviles 2"
      }
    }, ['id']);

    const existingCourse2 = await queryInterface.rawSelect('Courses', {
      where: {
        description: "Sem de complementación practica 3"
      }
    }, ['id']);

    // Si alguno ya existe, no hacemos nada
    if (existingCourse || existingCourse2) {
      return;
    }

    // Inserción masiva
    await queryInterface.bulkInsert('Courses', [
      {
        description: 'Desarrollo de apps Moviles 2',
        initials:'DM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Sem de complementación practica 3',
        initials:'SP',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

  }
};
