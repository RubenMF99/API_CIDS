const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    identification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    cellPhone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adress: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: []
  });
};
