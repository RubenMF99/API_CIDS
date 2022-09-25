const { user: User } = require("../../models");
const aes256 = require("aes256");
const { validationResult } = require("express-validator");

module.exports.registerClient = async (req, res) => {
  const { password, email } = req.body;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    let user_existed = await User.findOne({ where: { email } });
    if (!user_existed) {
      req.body.password = aes256.encrypt(process.env.ENCRYPT_PASS, password);
      await User.create(req.body);
      return res.status(200).json({ msg: "Usuario registrado correctamente." });
    }
    res.status(403).json({ msg: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errores: error });
  }
};

module.exports.Profile = async (req, res) => {
  const { email } = req.body;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    let user_existed = await User.findOne({ where: { email } });
    if (user_existed) {
      return res.status(200).json({ Profile: user_existed });
    }
    return res.status(400).json({ msg: "User not existed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
