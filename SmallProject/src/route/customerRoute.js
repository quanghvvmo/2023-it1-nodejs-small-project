import customerController from "../controller/customerController"
import express from "express"
import authService from "../middlewares/auth"

const customerRoute = express.Router();

customerRoute.post('/api/v1/customer', authService.authJWT, customerController.createCustomer)
customerRoute.get('/api/v1/customer', authService.authJWT, customerController.getAllCustomer)
customerRoute.get('/api/v1/customer/:id', authService.authJWT, customerController.getCustomerbyId)
customerRoute.put('/api/v1/customer', authService.authJWT, customerController.updateCustomer)
customerRoute.delete('/api/v1/customer/:id', authService.authJWT, customerController.deleteCustomer)
customerRoute.patch('/api/v1/customer/:id/active', authService.authJWT, customerController.activeCustomer)
customerRoute.patch('/api/v1/customer/:id/inactive', authService.authJWT, customerController.inactiveCustomer)

module.exports = customerRoute