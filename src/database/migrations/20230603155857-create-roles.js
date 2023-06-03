'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert('roles', [
      { name: 'Admin', created_at: new Date(), updated_at: new Date() },
      { name: 'User', created_at: new Date(), updated_at: new Date() },
      { name: 'Viewer', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.dropTable('roles');
  }
};
