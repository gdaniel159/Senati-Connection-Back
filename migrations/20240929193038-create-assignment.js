'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assignment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(200),
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // Nombre de la tabla `usuarios` en la base de datos
          key: 'id',
        },
        onDelete: 'CASCADE', // Elimina las tareas si el usuario es eliminado
        onUpdate: 'CASCADE',
      },
      idBlock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Blocks', // Nombre de la tabla `block` en la base de datos
          key: 'id',
        },
        onDelete: 'CASCADE', // Elimina las tareas si el bloque es eliminado
        onUpdate: 'CASCADE',
      },
      dateRegister: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assignment');
  },
};
