const { products: Products } = require('../../models');
const { validationResult } = require("express-validator");

module.exports.registerProduct = async (req, res) => {
  const { codeProduct } = req.body
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    let product_existed = await Products.findOne({ where: { codeProduct } });
    if (!product_existed) {
      await Products.create(req.body);
      return res.status(201).json({ msg: "Producto registrado correctamente." });
    }
    return res.status(403).json({ msg: "El producto ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
module.exports.getProducts = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const productsAll = await Products.findAll();
    return res.status(200).json({ listProducts: productsAll });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports.getProductById = async (req, res) => {
  const { codeProduct } = req.params;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    let product_existed = await Products.findOne({ where: { codeProduct } });
    if (product_existed) {
      return res.status(200).json({ Product: product_existed });
    }
    res.status(403).json({ msg: "El producto no existe" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }

}