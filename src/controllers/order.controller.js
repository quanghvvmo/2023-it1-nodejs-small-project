import httpStatus from "http-status";
import {
    addOrder,
    updateOrder,
    getOrderDetail,
    getListOrders,
    softDeleteOrder,
    hardDeleteOrder,
} from "../services/order.service.js";
import { createOrderSchema, updateOrderSchema } from "../validations/order.validation.js";
import config from "../config/index.js";

const createOrderController = async (req, res, next) => {
    try {
        const { error, value } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const createdOrderId = await addOrder(req.user.Customer.id, value);
        return res.status(httpStatus.CREATED).json(createdOrderId);
    } catch (error) {
        next(error);
    }
};

const getOrderController = async (req, res, next) => {
    try {
        const order = await getOrderDetail(req.params.id);
        return res.status(httpStatus.OK).json(order);
    } catch (error) {
        next(error);
    }
};

const getOrdersController = async (req, res, next) => {
    try {
        let pageIndex = parseInt(req.query.pageIndex);
        let pageSize = parseInt(req.query.pageSize);
        if (isNaN(pageIndex) || isNaN(pageSize) || pageIndex <= 0 || pageSize <= 0) {
            pageIndex = config.default_index_pagination;
            pageSize = config.default_size_pagination;
        }

        const orders = await getListOrders(pageIndex, pageSize);
        return res.status(httpStatus.OK).json(orders);
    } catch (error) {
        next(error);
    }
};

const updateOrderController = async (req, res, next) => {
    try {
        const { error, value } = updateOrderSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
        }

        const updatedOrder = await updateOrder(req.params.id, value);
        return res.status(httpStatus.OK).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

const hardDeleteOrderController = async (req, res, next) => {
    try {
        const order = await hardDeleteOrder(req.params.id);
        return res.status(httpStatus.OK).json(order);
    } catch (error) {
        next(error);
    }
};

const softDeleteOrderController = async (req, res, next) => {
    try {
        const order = await softDeleteOrder(req.params.id);
        return res.status(httpStatus.OK).json(order);
    } catch (error) {
        next(error);
    }
};

export {
    createOrderController,
    getOrderController,
    getOrdersController,
    updateOrderController,
    hardDeleteOrderController,
    softDeleteOrderController,
};
