import orderDetailController from "../controller/orderDetailController"
import express from "express"
import authService from "../middlewares/auth"

const orderDetailRoute = express.Router();

orderDetailRoute.post('/api/v1/orderdetail', authService.authJWT, orderDetailController.createOrderDetail)
orderDetailRoute.get('/api/v1/orderdetail', authService.authJWT, orderDetailController.getAllOrderDetail)
orderDetailRoute.get('/api/v1/orderdetail/:id', authService.authJWT, orderDetailController.getOrderDetailbyId)
orderDetailRoute.put('/api/v1/orderdetail', authService.authJWT, orderDetailController.updateOrderDetail)
orderDetailRoute.delete('/api/v1/orderdetail/:id', authService.authJWT, orderDetailController.hardDelete)
orderDetailRoute.patch('/api/v1/orderdetail/:id/delete', authService.authJWT, orderDetailController.softDelete)

module.exports = orderDetailRoute