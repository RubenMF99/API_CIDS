const { validationResult } = require("express-validator");

module.exports.validate = (req) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
};

module.exports.validate_user= (user_existed,res) =>{
    if (user_existed) {
        res.status(403).json({ msg: "El usuario ya existe" });
        return true;
      }
}
module.exports.validate_product= (product_existed,res) =>{
    if (product_existed) {
        res.status(403).json({ msg: "El producto ya existe" });
        return true;
      }
}


