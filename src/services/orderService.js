const httpStatus = require("http-status");
const sequelize = require('../models/dbconfig.js')
const APIError = require('../helper/apiError');
const { ApiResponse, ApiPagingResponse } = require('../helper/apiResponse');
const { OrderDetail, Order, Product } = sequelize.models;
const productMessage = require('../constants/productMessage');
const orderMessage = require('../constants/orderMessage');

class OrderService {
    createOrder = async(CustomerId, data) => {
        const { ProductId, price, tax, discount } = data;
        const product = await Product.findOne({ where: { ProductId } });
        if(!product) {
            throw new APIError({ message: productMessage.PRODUCT_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
        const transaction = await sequelize.transaction();
        let order;
        const totalPrice = price + tax - discount;
        try {
            order = Order.create({
                ...data,
                totalPrice,
                CustomerId
            }, {
                transaction
            });
            const OrderId = order.id;
            await OrderDetail.create({
                ...data,
                totalPrice,
                OrderId 
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new APIError({
                message: orderMessage.ERROR_TRANSACTION,
                status: httpStatus.INTERNAL_SERVER_ERROR
            })
        }
        return new ApiPagingResponse(order, httpStatus.CREATED, orderMessage.ORDER_CREATED);
    }

    getListOrders = async(pageIndex, pageSize) => {
        const orders = await Order.findAll();

        const numOfOrders = orders.length;
        if(!numOfOrders) {
            throw new APIError({ message: orderMessage.ORDER_NOT_FOUND, status: httpStatus.BAD_REQUEST });
        }

        const totalPages = parseInt((numOfOrders + pageSize - 1) / pageSize);
        if (pageIndex > totalPage) {
            throw new APIError({ message: orderMessage.INVALID_PAGGING, status: httpStatus.BAD_REQUEST });
        }
    
        const start = (pageIndex - 1) * pageSize;
        const end = start + pageSize;

        return new ApiPagingResponse(
            orders.slice(start, end),
            pageIndex,
            pageSize,
            numOfOrders,
            totalPages
        );
    }

    updateOrder = async (id, data) => {
        const order = await Order.findByPk(id);
        const { price = order.price, tax = order.tax, discount = order.discount } = data || {};
        const totalPrice = price + tax - discount;
        let updateOrder;
        const transaction = sequelize.transaction();
        try {
            updateOrder = await Order.update(
                { ...data, totalPrice },
                { where: { id } },
                { transaction }
            );

            await OrderDetail.update(
                { ...data, totalPrice },
                { where: { OrderId: id } },
                { transaction }
            );
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new APIError({
                message: orderMessage.ERROR_TRANSACTION,
                status: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
        return ApiResponse(updateOrder, httpStatus.OK, orderMessage.ORDER_UPDATED);
    }

    getOrderDetail = async(OrderId) => {
        const orderDetail = await OrderDetails.findOne({ where: { OrderId } });
        if (!orderDetail) {
            throw new APIError({ message: orderMessage.ORDER_NOT_FOUND , status: httpStatus.NOT_FOUND });
        }
        return orderDetail;
    }

    softDeleteOrder = async (id) => {
        const deletedOrder = await Order.update({ isDeleted: true }, { where: { id } });
        if (!deletedOrder) {
            throw new APIError({ message: orderMessage.ORDER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        return new ApiDataResponse(httpStatus.OK, orderMessage.ORDER_SOFT_DELETED, deletedOrder);
    };
    
    hardDeleteOrder = async (id) => {
        const deletedOrder = await Order.destroy({ where: { id } });
        if (!deletedOrder) {
            throw new APIError({ message: orderMessage.ORDER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        return new ApiDataResponse(httpStatus.OK, orderMessage.ORDER_HARD_DELETED, deletedOrder);
    };

}

module.exports = new OrderService();