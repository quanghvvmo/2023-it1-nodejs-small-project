const express = require('express');
const customerController = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.post("/customers", customerController.createCustomer);

customerRouter.get("/customers", customerController.getListCustomers);
customerRouter.get("/customers/:id", customerController.getCustomerDetail);

customerRouter.put("/customers/:id", customerController.updateCustomer);

customerRouter.delete("/customers/:id/soft", customerController.softDeleteCustomer);
customerRouter.delete("/customers/:id/hard", customerController.hardDeleteCustomer);

module.exports = customerRouter;