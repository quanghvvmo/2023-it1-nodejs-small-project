import express from "express";
import {
    createCustomerController,
    getCustomerController,
    getCustomersController,
    updateCustomerController,
    hardDeleteCustomerController,
    softDeleteCustomerController,
} from "../controllers/customer.controller.js";

const customerRouter = express.Router();

customerRouter.get("/api/v1/customers", getCustomersController);
customerRouter.get("/api/v1/customers/:id", getCustomerController);

customerRouter.post("/api/v1/customers", createCustomerController);

customerRouter.put("/api/v1/customers/:id", updateCustomerController);

customerRouter.delete("/api/v1/customers/:id/soft", softDeleteCustomerController);
customerRouter.delete("/api/v1/customers/:id/hard", hardDeleteCustomerController);

export default customerRouter;
