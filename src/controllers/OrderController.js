const { order: Order } = require("../../models");
const { order_has_products: ListOrder } = require("../../models");
const { validationResult } = require("express-validator");
const { sequelize } = require("../../models");

module.exports.createOrder = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { idorder, identification, idproduct, amount } = req.body;

    const neworder = {
      idorder: idorder,
      user_identification: identification,
    };
    const listOrder = {
      order_idorder: idorder,
      products_idproducts: idproduct,
      amount: amount,
    };
    const order = await sequelize.query(
      `SELECT * FROM "order" INNER JOIN order_has_products 
          ON "order".idorder = order_has_products.order_idorder
            WHERE idorder = ${idorder}`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (order.length === 0) {
      
      await Order.create(neworder);
      await ListOrder.create(listOrder);
      return res.status(201).json({ msg: "Orden creada correctamente." });
    }
    return res.status(400).json({ msg: "Ya Existe Una orden" });
  } catch (error) {
    return res.status(400).json({ errores: error });
  }
};
