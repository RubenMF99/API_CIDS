const { user: User } = require("../../models");
const { validate } = require("../services");
const aes256 = require("aes256");

module.exports.registerClient = async (req, res) => {
    validate(req);
  const { password, email } = req.body;

  let user_existed = await User.findOne({ where: { email } });
  try {
    if (!user_existed) {
      req.body.password = aes256.encrypt(process.env.ENCRYPT_PASS, password);
      await User.create(req.body);
      return res.status(201).json({ msg: "Usuario registrado correctamente." });
    }
    res.status(403).json({ msg: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errores: error });
  }
};

module.exports.Profile = async (req, res) => {
  validate(req);
  const { email } = req.body;
  let user_existed = await User.findOne({ where: { email } });
  try {
    if (user_existed) {
      return res.status(200).json({ Profile: user_existed });
    }
    return res.status(400).json({ msg: "User not existed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
