import orderController from "../controller/orderController"
import express from "express"

const orderRoute = express.Router();

orderRoute.post('/api/v1/order', orderController.createOrder)
orderRoute.get('/api/v1/order', orderController.getAllOrder)
orderRoute.get('/api/v1/order/:id', orderController.getOrderbyId)
orderRoute.put('/api/v1/order', orderController.updateOrder)
orderRoute.delete('/api/v1/order/:id', orderController.hardDeleteOrder)
orderRoute.patch('/api/v1/order/:id/delete', orderController.softDeleteOrder)

module.exports = orderRoute