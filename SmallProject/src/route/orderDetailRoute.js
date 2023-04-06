import orderDetailController from "../controller/orderDetailController"
import express from "express"

const orderDetailRoute = express.Router();

orderDetailRoute.post('/api/v1/orderdetail', orderDetailController.createOrderDetail)
orderDetailRoute.get('/api/v1/orderdetail', orderDetailController.getAllOrderDetail)
orderDetailRoute.get('/api/v1/orderdetail/:id', orderDetailController.getOrderDetailbyId)
orderDetailRoute.put('/api/v1/orderdetail', orderDetailController.updateOrderDetail)
orderDetailRoute.delete('/api/v1/orderdetail/:id', orderDetailController.hardDelete)
orderDetailRoute.patch('/api/v1/orderdetail/:id/delete', orderDetailController.softDelete)

module.exports = orderDetailRoute