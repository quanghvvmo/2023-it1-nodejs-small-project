const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.patch('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);
router.get('/customers', customerController.getListCustomers);
router.get('/customers/:id', customerController.getCustomerDetail);

module.exports = router;