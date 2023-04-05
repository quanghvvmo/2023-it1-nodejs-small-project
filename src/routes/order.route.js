import express from "express";
import { createOrderController } from "../controllers/order.controller.js";
import authJWT from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authJWT, createOrderController);

export default orderRouter;
