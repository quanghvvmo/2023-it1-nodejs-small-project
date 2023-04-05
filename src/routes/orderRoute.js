const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/customers', orderController.createOrder);
router.put('/customers/:id', orderController.updateOrder);
router.patch('/customers/:id', orderController.updateOrder);
router.delete('/customers/:id/hard', orderController.hardDeleteOrder);
router.delete('/customers/:id/soft', orderController.softDeleteOrder);
router.get('/customers', orderController.getListOrders);
router.get('/customers/:id', orderController.getOrderDetail);

module.exports = router;