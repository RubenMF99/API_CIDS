const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    idorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_identification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'identification'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "fk_order_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_identification" },
        ]
      },
    ]
  });
};
