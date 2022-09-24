const { order: Order } = require("../../models");
const { order_has_products: ListOrder } = require("../../models");
const { validate, getOrder } = require("../services");
const { sequelize } = require("../../models");

module.exports.createOrder = async (req, res) => {
  validate(req);
  const { idorder, identification, idproduct, amount } = req.body;

  const neworder = {
    idorder: idorder,
    user_identification: identification,
  };
  const listOrder = {
    order_idorder: idorder,
    product_idproducts: idproduct,
    amount: amount,
  };
  try {
    const order = await getExcuseUser(idorder, req, res)
      .then(function () {
        console.log("Promise Resolved");
      })
      .catch(function () {
        console.log("Promise Rejected");
      });
    if (!order) {
      await Order.create(neworder);
      await ListOrder.create(listOrder);
      return res.status(201).json({ msg: "Orden creada correctamente." });
    }
    return res.status(400).json({ msg: "Ya Existe Una orden" });
  } catch (error) {
    return res.status(400).json({ errores: error });
  }
};
