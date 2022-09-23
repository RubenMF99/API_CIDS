const { products:Products } = require('../../models');
const {validate} = require('../services');

const validate_product = async(req,res) =>{
  const{ codeProduct} = req.body;
  try{
    let product_existed = await Products.findOne({ where: { codeProduct } });
    if (product_existed) {
        res.status(403).json({ msg: "El producto ya existe" });
        return true;
      }
      return false
  }catch(error){
    console.log(error);
    return;
  }
 
}
module.exports.registerProduct = async(req,res)=>{
    validate(req);
    try {
      if(validate_product(req,res)!== false) return;
      await Products.create(req.body);
      return res.status(201).json({ msg: "Producto registrado correctamente." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
}
module.exports.getProducts = async(req,res)=>{
      validate(req);
      try {
        const productsAll = await Products.findAll();
        return res.status(200).json({listProducts:productsAll});
      } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
      }
}

module.exports.getProductById = async(req,res) =>{
    validate(req);
    const{ codeProduct} = req.params;
    try {
      let product_existed = await Products.findOne({ where: { codeProduct } });
      if(product_existed){
        return res.status(200).json({ Product: product_existed });
      }
      res.status(403).json({ msg: "El producto no existe" });
    } catch (error) {
         return res.status(500).json({ msg: "Internal server error" });
    }
   
}