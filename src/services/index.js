const { validationResult } = require("express-validator");
const { products:Products } =require("../../models");
module.exports.validate = (req) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
};

module.exports.validate_user= async (req,res) =>{
  const { email, password } = req.body;
  let user_existed = await User.findOne({ where: { email } });
    if (user_existed) {
        res.status(403).json({ msg: "El usuario ya existe" });
        return true;
      }
      return false
}
module.exports.validate_product = async(req,res) =>{
    const{ codeProduct} = req.body;
    let product_existed = await Products.findOne({ where: { codeProduct } });
    if (product_existed) {
        res.status(403).json({ msg: "El producto ya existe" });
        return true;
      }
      return false
}


