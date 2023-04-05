import express from "express";
import userRouter from "./user.route.js";
import customerRouter from "./customer.route.js";
import orderRouter from "./order.route.js";

const routers = express.Router();
routers.use(userRouter);
routers.use(customerRouter);
routers.use(orderRouter);

export default routers;
