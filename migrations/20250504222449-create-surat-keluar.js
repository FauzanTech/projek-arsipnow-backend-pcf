'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suratKeluar', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_surat: {
        type: Sequelize.STRING
      },
      tgl_surat: {
        type: Sequelize.DATEONLY
      },
      tujuan: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.STRING
      },
      penandatangan: {
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
    await queryInterface.dropTable('suratKeluar');
  }
};