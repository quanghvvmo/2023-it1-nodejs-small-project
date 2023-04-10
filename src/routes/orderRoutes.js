const express = require('express');
const orderMethod = require('../_service/order')
const orderRouter = express.Router();
const authMiddleware = require('../middlewares/auth')

orderRouter.get('/orders/',orderMethod.getAllOrders)
orderRouter.get('/order/:id',orderMethod.getOrderDetail)
orderRouter.post('/order',orderMethod.createOrder)
orderRouter.put('/order/:id',orderMethod.updateOrder)
orderRouter.put('/order/delete/:id',orderMethod.deleteOrder)

module.exports  = orderRouter