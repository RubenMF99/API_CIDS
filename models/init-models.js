var DataTypes = require("sequelize").DataTypes;
var _order = require("./order");
var _order_has_products = require("./order_has_products");
var _products = require("./products");
var _user = require("./user");

function initModels(sequelize) {
  var order = _order(sequelize, DataTypes);
  var order_has_products = _order_has_products(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  order.belongsToMany(products, { as: 'products_idproducts_products', through: order_has_products, foreignKey: "order_idorder", otherKey: "products_idproducts" });
  products.belongsToMany(order, { as: 'order_idorder_orders', through: order_has_products, foreignKey: "products_idproducts", otherKey: "order_idorder" });
  order_has_products.belongsTo(order, { as: "order_idorder_order", foreignKey: "order_idorder"});
  order.hasMany(order_has_products, { as: "order_has_products", foreignKey: "order_idorder"});
  order_has_products.belongsTo(products, { as: "products_idproducts_product", foreignKey: "products_idproducts"});
  products.hasMany(order_has_products, { as: "order_has_products", foreignKey: "products_idproducts"});
  order.belongsTo(user, { as: "user_identification_user", foreignKey: "user_identification"});
  user.hasMany(order, { as: "orders", foreignKey: "user_identification"});

  return {
    order,
    order_has_products,
    products,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
