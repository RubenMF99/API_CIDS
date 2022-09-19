const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_has_products', {
    order_idorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'idorder'
      }
    },
    products_idproducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproducts'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_has_products',
    timestamps: false,
    indexes: [
      {
        name: "fk_order_has_products_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_idproducts" },
        ]
      },
      {
        name: "fk_order_has_products_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_idorder" },
        ]
      },
    ]
  });
};
