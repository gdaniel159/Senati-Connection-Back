'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const existingrecordCab = await queryInterface.rawSelect('recordCab', {
      where: {
        idCourse: 1,
        description: 'Grupo para la comunicación'
      }
    }, ['id']);

    const existingrecordCab2 = await queryInterface.rawSelect('recordCab', {
      where: {
        idCourse: 2,
        description: 'Grupo para la comunicación'
      }
    }, ['id']);

    // Si alguno ya existe, no hacemos nada
    if (existingrecordCab || existingrecordCab2) {
      return;
    }

    // Inserción masiva
    await queryInterface.bulkInsert('recordCab', [
      {
        idCourse: 1,
        description: 'Grupo para la comunicación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idCourse: 2,
        description: 'Grupo para la comunicación',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
