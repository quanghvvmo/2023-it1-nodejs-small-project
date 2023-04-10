const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const orderRouter = express.Router();

orderRouter.post("/orders", authMiddleware, orderController.createOrder);

orderRouter.get("/orders", orderController.getListOrders);
orderRouter.get("/orders/:id", orderController.getOrderDetail);

orderRouter.put("/orders/:id", orderController.updateOrder);

orderRouter.delete("/orders/:id/soft", orderController.softDeleteOrder);
orderRouter.delete("/orders/:id/hard", orderController.hardDeleteOrder);

module.exports = orderRouter;