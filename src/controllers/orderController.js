const orderService = require("../services/orderService");
const httpStatus = require('http-status');
const orderValidation = require('../validations/orderValidation');
const config = require('../config/index');

class OrderController {
    createOrder = async (req, res, next) => {
        try {
            const { error, value } = orderValidation.createOrderSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }
            const order = await orderService.createOrder(req.user.Customer.id, value);
            return res.status(httpStatus.CREATED).json(order);
        } catch (error) {
            next(error);
        }
    }

    updateOrder = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = orderValidation.updateOrderSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }
            const order = await orderService.updateOrder(id, value);
            return res.status(httpStatus.CREATED).json(order);
        } catch (error) {
            next(error);
        }
    }

    getOrderDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderDetail(id);
            return res.status(httpStatus.OK).json(order);
        } catch (error) {
            next(error);
        }
    }

    getListOrders = async (req, res, next) => {
        try {
            const pageIndex = parseInt(req.query.pageIndex) || config.default_index_paging;
            const pageSize = parseInt(req.query.pageSize) || config.default_size_paging;
            const orders = await orderService.getListOrders(pageIndex, pageSize);
            return res.status(httpStatus.OK).json(orders);
        } catch (error) {
            next(error)
        }
    }

    hardDeleteOrder = async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await hardDeleteOrder(id);
            return res.status(httpStatus.OK).json(order);
        } catch (error) {
            next(error);
        }
    };
    
    softDeleteOrder = async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await softDeleteOrder(id);
            return res.status(httpStatus.OK).json(order);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new OrderController();