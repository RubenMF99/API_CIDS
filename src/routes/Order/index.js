const express = require('express');
const {check} = require('express-validator')
const {
    createOrder
} = require('../../controllers/OrderController');
const api = express.Router();

api.post('/order',
[
    check("idorder", "El Correo electrónico es requerido").isEmail(),
    check("password", "La contraseña debe ser mínimo 8 caracteres").isLength({
      min: 8,
    }),
  ],
  createOrder
);

module.exports = api