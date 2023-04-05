const { Customer } = require('../models/Customer');
const { Order } = require('../models/Order');
const orderService = require('../services/orderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const { customerId } = req.body;
            const existingCustomer = await Customer.findOne({ where: { id: customerId }});
            if(existingCustomer) {
                return res.status(404).json({ message: 'Customer existed' });
            }
            const order = await orderService.createOrder({ 
                customerId,
                isDeleted: false,
                ...req.body
            });
            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateOrder(req, res) {
        try {
            const { id } = req.body;
            const existingOrder = await Order.findOne({ where: { id }});
            if(!existingOrder) {
                return res.status(404).json({ message: 'Order not existed' });
            }
            const updateOrder = orderService.updateOrder(id, { ...req.body });
            res.status(200).json(updateOrder);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async hardDeleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);
            if(!order) {
                return res.status(404).json({ message: 'Order not existed' });
            }
            await orderService.hardDeleteOrder(id);
            return res.status(200).json({ message: `Deleted user - ${ id }` });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async softDeleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);
            if(!order) {
                return res.status(404).json({ message: 'Order not existed' });
            }
            await orderService.softDeleteOrder(id);
            return res.status(200).json({ message: `Deleted user - ${ id }` });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getListOrders(req, res) {
        try {
            const { page, limit } = req.query;
            if (page <= 0 || limit <= 0) {
                return res.status(404).json({ message: "Parameters aren't accepted" });
            }
            const orders = await orderService.getListOrders(page, limit);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getOrderDetail(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderDetail(id);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new OrderController();