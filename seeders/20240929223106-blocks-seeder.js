'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Comprobar si ya existen los bloques antes de insertarlos
    const existingBlock = await queryInterface.rawSelect('Blocks', {
      where: {
        description: "504"
      }
    }, ['id']);

    const existingBlock2 = await queryInterface.rawSelect('Blocks', {
      where: {
        description: "203"
      }
    }, ['id']);

    // Si alguno de los bloques ya existe, no insertamos nada
    if (existingBlock || existingBlock2) {
      return;
    }

    // Insertar nuevos bloques en la tabla 'Blocks'
    await queryInterface.bulkInsert('Blocks', [
      {
        description: '504',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: '203',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

  }
};
