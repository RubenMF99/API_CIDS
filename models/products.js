const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    idproducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codeProduct: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nameProduct: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: []
  });
};
