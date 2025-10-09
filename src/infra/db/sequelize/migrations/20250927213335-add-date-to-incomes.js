'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("incomes", "date", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("incomes", "date");
  },
};
