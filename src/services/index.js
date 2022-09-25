const { validationResult } = require("express-validator");
module.exports.validate = (req) => {
  return new Promise(async (resolve, reject) => {
    try{
    const errores = validationResult(req);
    (!errores.isEmpty()) ? reject( errores.array()): resolve()
    }catch(error){
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
});
}
