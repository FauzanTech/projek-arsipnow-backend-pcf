'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suratMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  suratMasuk.init({
    no_surat: DataTypes.STRING,
    tgl_diterima: DataTypes.DATE,
    tgl_surat: DataTypes.DATE,
    perihal: DataTypes.STRING,
    pengirim: DataTypes.STRING,
    file_surat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suratMasuk',
    tableName: 'suratmasuk'
  });
  return suratMasuk;
};