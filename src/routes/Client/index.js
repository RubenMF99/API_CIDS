const express = require('express');
const {check} = require('express-validator')
const {
    registerClient,
    Profile
} = require('../../controllers/ClientController');
const api = express.Router();

api.post('/register',
[
    check("email", "El Correo electrónico es requerido").isEmail().normalizeEmail(),
    check("password", "La contraseña debe ser mínimo 8 caracteres").isLength({
      min: 8,
    }),
    check("name", "El Nombre es requerido").notEmpty(),
    check("adress", "La Direccion es requerida").notEmpty(),
    check("cellPhone", "El Telefono es requerido ").notEmpty(),
    check("identification", "la identificacion es requerida").notEmpty()
  ],
  registerClient
);

api.post('/profile',Profile);

module.exports = api
