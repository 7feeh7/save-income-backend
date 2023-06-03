'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('incomes', { 
      id: {
        type: Sequelize.STRING, 
        primaryKey: true
      },
      user_id: {
        type: Sequelize.STRING, 
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL, 
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('incomes');
  }
};
