'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existingAssignment = await queryInterface.rawSelect('assignment', {
      where: {
        idUser: 1,
        idBlock: 1
      }
    }, ['id']);

    const existingAssignment2 = await queryInterface.rawSelect('assignment', {
      where: {
        idUser: 1,
        idBlock: 2
      }
    }, ['id']);

    // Si alguno ya existe, no hacemos nada
    if (existingAssignment || existingAssignment2) {
      return;
    }

    // Inserción masiva
    await queryInterface.bulkInsert('assignment', [
      {
        idUser: 1,
        idBlock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUser: 1,
        idBlock: 2,
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
