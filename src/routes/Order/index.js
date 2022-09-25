const express = require('express');
const {check} = require('express-validator')
const {
    createOrder,
    getAllOrder,
    getOrderById
} = require('../../controllers/OrderController');
const api = express.Router();

api.route('/order').post(
[
    check("idorder", "El id requerido").notEmpty(),
    check("identification", "La identificacion es requerida").notEmpty(),
    check("idproduct", "La id de producto es requerida").notEmpty(),
    check("amount", "La cantidad de productos es requerida").notEmpty(),
  ],
  createOrder
).get(getAllOrder);
api.get('/order/:idorder',getOrderById)

module.exports = api