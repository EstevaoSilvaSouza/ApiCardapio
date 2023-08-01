'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CartItem', 'NameCart', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('CartItem', 'Status', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CartItem', 'NameCart');
    await queryInterface.removeColumn('CartItem', 'Status');
  }
};
