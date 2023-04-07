import express from "express";
import {
    createOrderController,
    getOrderController,
    getOrdersController,
    updateOrderController,
    hardDeleteOrderController,
    softDeleteOrderController,
} from "../controllers/order.controller.js";
import authJWT from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authJWT, createOrderController);

orderRouter.get("/orders", getOrdersController);
orderRouter.get("/orders/:id", getOrderController);

orderRouter.put("/orders/:id", updateOrderController);

orderRouter.delete("/orders/:id/soft", softDeleteOrderController);
orderRouter.delete("/orders/:id/hard", hardDeleteOrderController);

export default orderRouter;
