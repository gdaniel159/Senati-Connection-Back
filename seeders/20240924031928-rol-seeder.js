'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existingRol = await queryInterface.rawSelect('Rols', {
      where: {
        description: "Administrador"
      }
    }, ['id']);

    if (existingRol) {
      return;
    }

    await queryInterface.bulkInsert('Rols', [{
      description: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

  },

  async down (queryInterface, Sequelize) {
    
  }
};
