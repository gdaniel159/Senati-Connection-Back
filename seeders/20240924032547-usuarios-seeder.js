'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  up: async (queryInterface, Sequelize) => {

    const rol = await queryInterface.rawSelect('Rols', {
      where: {
        description: 'Administrador'
      }
    }, ['id']);

    const existingUser = await queryInterface.rawSelect('Usuarios', {
      where: {
        email: 'freud@senati.pe'
      }
    }, ['id']);

    if (existingUser) {
      return;
    }

    const hashedPassword = await bcrypt.hash('1234', 10);

    await queryInterface.bulkInsert('Usuarios', [{
      firstName: 'Freud',
      lastName: 'Melgar',
      idRol: rol,
      email: 'freud@senati.pe',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }

};
