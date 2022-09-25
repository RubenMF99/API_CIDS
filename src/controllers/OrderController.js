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
module.exports.getAllOrder = async (req, res) => {
  const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
  try {
    const orderAll = await sequelize.query(
      `SELECT * FROM "order" INNER JOIN order_has_products 
          ON "order".idorder = order_has_products.order_idorder`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (orderAll.length > 0) {
      return res.status(200).json({ OrderList: orderAll })
    }
    return res.status(400).json({ msg: "No hay ordenes registradas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
module.exports.getOrderById = async (req, res) => {
  const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const idorder = req.params.idorder;
  try {
    const order = await sequelize.query(
      `SELECT * FROM "order" INNER JOIN order_has_products 
          ON "order".idorder = order_has_products.order_idorder
          WHERE idorder = ${idorder}
          `,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (order.length > 0) {
      return res.status(200).json({ Order: order })
    }
    return res.status(400).json({ msg: "No hay ordenes registradas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}