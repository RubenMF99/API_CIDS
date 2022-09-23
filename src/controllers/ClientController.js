const { user:User } =  require('../../models');
const {validate,validate_user} = require('../services');
const aes256 = require('aes256');
module.exports.registerClient = async (req, res) => {
    validate(req);
    try {
      if(validate_user(req,res)== true) return;
      req.body.password = aes256.encrypt(process.env.ENCRYPT_PASS, password);
      await User.create(req.body);
      return res.status(201).json({ msg: "Usuario registrado correctamente." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal error server" });
    }
  };