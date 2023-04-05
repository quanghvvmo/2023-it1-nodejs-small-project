import express from "express";
import {
    createCustomerController,
    getCustomerController,
    getCustomersController,
    updateCustomerController,
    hardDeleteCustomerController,
    softDeleteCustomerController,
} from "../controllers/customer.controller.js";
import authJWT from "../middlewares/auth.middleware.js";

const customerRouter = express.Router();

customerRouter.get("/customers", getCustomersController);
customerRouter.get("/customers/:id", authJWT, getCustomerController);

customerRouter.post("/customers", createCustomerController);

customerRouter.put("/customers/:id", updateCustomerController);

customerRouter.delete("/customers/:id/soft", softDeleteCustomerController);
customerRouter.delete("/customers/:id/hard", hardDeleteCustomerController);

export default customerRouter;
