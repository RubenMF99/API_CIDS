const { products:Products } = require('../../models');
const {validate,validate_product} = require('../services');
module.exports.registerProduct = async(req,res)=>{
    validate(req);
   const{ codeProduct} = req.body;
    try {
      let product_existed = await Products.findOne({ where: { codeProduct } });
      if(validate_product(product_existed,res)== true) return;
      await Products.create(req.body);
      return res.status(201).json({ msg: "Producto registrado correctamente." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal error server" });
    }
}