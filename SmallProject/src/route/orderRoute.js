import orderController from "../controller/orderController"
import express from "express"
import authService from "../middlewares/auth"

const orderRoute = express.Router();

orderRoute.post('/api/v1/order', authService.authJWT, orderController.createOrder)
orderRoute.get('/api/v1/order', authService.authJWT, orderController.getAllOrder)
orderRoute.get('/api/v1/order/:id', authService.authJWT, orderController.getOrderbyId)
orderRoute.put('/api/v1/order', authService.authJWT, orderController.updateOrder)
orderRoute.delete('/api/v1/order/:id', authService.authJWT, orderController.hardDeleteOrder)
orderRoute.patch('/api/v1/order/:id/delete', authService.authJWT, orderController.softDeleteOrder)

module.exports = orderRoute