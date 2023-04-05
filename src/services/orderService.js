const { Order } = require('../models/Order');

class OrderService {
    async createOrder(data) {
        try {
            const { customerId } = data
            const order = await Order.create({
                customerId,
                ...data
            });
            return order;
        } catch (error) {
            throw new Error('Failed to create order');
        }
    }

    async updateOrder(id, data) {
        try {
            const [ rows ] = await Order.update(data, {
                where: { id },
                returning: true
            });
            return rows[0];
        } catch (error) {
            throw new Error('Failed to update order');
        }
    }

    async hardDeleteOrder(id) {
        try {
            const rowsDeleted = await Order.destroy({
                where: { id }
            });
            return rowsDeleted;
        } catch (error) {
            throw new Error('Failed to delete order');
        }
    }

    async softDeleteOrder(id) {
        try {
            const rowsDeleted = await Order.update({ isDeleted: true }, {
                where: { id },
                returning: true
            });
            return rowsDeleted[0];
        } catch (error) {
            throw new Error('Failed to delete order');
        }
    }

    async getListOrders(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const orders = await Order.findAll({
                limit,
                offset
            });
            return orders;
        } catch (error) {
            throw new Error('Failed to get list of orders');
        }
    }

    async getOrderDetail(id) {
        try {
            const order = await Order.findByPk(id);
            if(!customer) {
                throw new Error('Order not exists');
            }
            return customer;
        } catch (error) {
            throw new Error(`Failed to get an order - ${id}`);
        }
    }
}

module.exports = new OrderService();