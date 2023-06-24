'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorys', {
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
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    await queryInterface.bulkInsert('categorys', [
      { name: 'Alimentação', created_at: new Date(), updated_at: new Date() },
      { name: 'Moradia', created_at: new Date(), updated_at: new Date() },
      { name: 'Transporte', created_at: new Date(), updated_at: new Date() },
      { name: 'Saúde', created_at: new Date(), updated_at: new Date() },
      { name: 'Educação', created_at: new Date(), updated_at: new Date() },
      { name: 'Lazer e entretenimento', created_at: new Date(), updated_at: new Date() },
      { name: 'Vestuário e acessórios', created_at: new Date(), updated_at: new Date() },
      { name: 'Dívidas e empréstimos', created_at: new Date(), updated_at: new Date() },
      { name: 'Impostos e taxas', created_at: new Date(), updated_at: new Date() },
      { name: 'Presentes e doações', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categorys');
  }
};
