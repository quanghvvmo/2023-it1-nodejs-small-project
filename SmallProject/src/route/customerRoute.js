import customerController from "../controller/customerController"
import express from "express"

const customerRoute = express.Router();

customerRoute.post('/api/v1/customer', customerController.createCustomer)
customerRoute.get('/api/v1/customer', customerController.getAllCustomer)
customerRoute.get('/api/v1/customer/:id', customerController.getCustomerbyId)
customerRoute.put('/api/v1/customer', customerController.updateCustomer)
customerRoute.delete('/api/v1/customer/:id', customerController.deleteCustomer)
customerRoute.patch('/api/v1/customer/:id/active', customerController.activeCustomer)
customerRoute.patch('/api/v1/customer/:id/inactive', customerController.inactiveCustomer)

module.exports = customerRoute