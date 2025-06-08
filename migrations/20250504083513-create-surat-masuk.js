'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suratMasuk', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_surat: {
        type: Sequelize.STRING
      },
      tgl_diterima: {
        type: Sequelize.DATEONLY
      },
      tgl_surat: {
        type: Sequelize.DATEONLY
      },
      perihal: {
        type: Sequelize.STRING
      },
      pengirim: {
        type: Sequelize.STRING
      },
      file_surat: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suratMasuk');
  }
};