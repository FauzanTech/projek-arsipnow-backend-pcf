'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suratKeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  suratKeluar.init({
    no_surat: DataTypes.STRING,
    tgl_surat: DataTypes.DATE,
    tujuan: DataTypes.STRING,
    perihal: DataTypes.STRING,
    penandatangan: DataTypes.STRING,
    file_surat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suratKeluar',
    tableName: 'suratkeluar'
  });
  return suratKeluar;
};