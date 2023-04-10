const express = require('express');
const customerMethod = require('../_service/customer')
const customerRouter = express.Router();
const authMiddleware = require('../middlewares/auth')

customerRouter.get('/customers',customerMethod.getAllCustomers)
customerRouter.get('/customers/:id',customerMethod.getCustomerDetail)
customerRouter.post('/customers/',customerMethod.createCustomer)
customerRouter.put('/customers/:id',customerMethod.updateCustomer)
customerRouter.delete('/customers/:id',customerMethod.deleteCustomer)
module.exports = customerRouter