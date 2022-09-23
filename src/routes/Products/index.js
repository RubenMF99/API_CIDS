const express = require('express');
const {check} = require('express-validator')
const {
    registerProduct

} = require('../../controllers/ProductController'); 

const api = express.Router();

api.post('/products',
[
    check("nameProduct", "El Nombre es Demasiado Largo").isLength({
        max:20
    }).notEmpty(),
    check("price", "El Precio deber ser un Entero ").isFloat().notEmpty(),
],
  registerProduct
)


module.exports = api