const { validationResult } = require("express-validator");
const { products:Products } =require("../../models");
const { user:User } =require("../../models");
module.exports.validate = (req) => {
  return new Promise(async (resolve, reject) => {
    const errores = validationResult(req);
    (!errores.isEmpty()) ? reject( errores.array()): resolve()
});
}

module.exports.getOrder = (idorder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await sequelize.query(
        `SELECT * FROM order INNER JOIN order_has_products ON order.idorder = order_has_products.order_idorder
         WHERE idorder = ${idorder}`,
    { type: sequelize.QueryTypes.SELECT }
      );

      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};
