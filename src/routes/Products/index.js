const express = require('express');
const {check} = require('express-validator')
const {
    registerProduct,
    getProducts,
    getProductById
} = require('../../controllers/ProductController'); 

const api = express.Router();

api.route('/products').post(
[
    check("nameProduct", "El Nombre es Demasiado Largo").isLength({
        max:20
    }).notEmpty(),
    check("price", "El Precio deber ser un Entero ").isFloat().notEmpty(),
],
  registerProduct
).get(getProducts);

api.get('/products/:codeProduct',getProductById)


module.exports = api