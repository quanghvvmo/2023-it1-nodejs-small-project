import APIError from "../helper/apiError.js";
import httpStatus from "http-status";
import sequelize from "../models/index.js";
import { ApiDataResponse, ApiPaginatedResponse } from "../helper/apiResponse.js";

const { Order, OrderDetails, Product } = sequelize.models;

const addOrder = async (customerId, payload) => {
    const product = await Product.findOne({ where: { id: payload.ProductId } });
    if (!product) {
        throw new APIError({ message: "Product doesn't exist !", status: httpStatus.NOT_FOUND });
    }

    const t = await sequelize.transaction();

    let newOrder;
    const totalPrice = payload.price + payload.tax - payload.discount;
    try {
        newOrder = await Order.create(
            { ...payload, totalPrice, CustomerId: customerId },
            { transaction: t }
        );

        await OrderDetails.create(
            { ...payload, totalPrice, OrderId: newOrder.id },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new APIError({
            message: "Transaction got error !",
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    return new ApiDataResponse(httpStatus.CREATED, "create success", newOrder);
};

const updateOrder = async (orderId, payload) => {
    const t = await sequelize.transaction();

    let updatedOrder;
    const order = await Order.findOne({ where: { id: orderId } });
    const price = payload.price || order.price;
    const tax = payload.tax || order.tax;
    const discount = payload.discount || order.discount;

    const totalPrice = price + tax - discount;
    try {
        updatedOrder = await Order.update(
            { ...payload, totalPrice },
            { where: { id: orderId } },
            { transaction: t }
        );

        await OrderDetails.update(
            { ...payload, totalPrice },
            { where: { OrderId: orderId } },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new APIError({
            message: "Transaction got error !",
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    return new ApiDataResponse(httpStatus.OK, "update success", updatedOrder);
};

const getOrderDetail = async (orderId) => {
    const orderDetail = await OrderDetails.findOne({
        where: { OrderId: orderId },
    });

    if (!orderDetail) {
        throw new APIError({ message: "Order not found !", status: httpStatus.NOT_FOUND });
    }

    return orderDetail;
};

const getListOrders = async (pageIndex, pageSize) => {
    const orders = await Order.findAll();

    const totalCount = orders.length;
    if (!totalCount) {
        throw new APIError({ message: "Orders not found !", status: httpStatus.NOT_FOUND });
    }

    const totalPages = Math.ceil(totalCount / pageSize);
    if (pageIndex > totalPages) {
        throw new APIError({ message: "Invalid page index", status: httpStatus.BAD_REQUEST });
    }

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return new ApiPaginatedResponse(
        pageIndex,
        pageSize,
        totalCount,
        totalPages,
        orders.slice(startIndex, endIndex)
    );
};

const softDeleteOrder = async (orderId) => {
    const deletedOrder = await Order.update({ isDeleted: true }, { where: { id: orderId } });
    if (!deletedOrder) {
        throw new APIError({ message: "Order not found", status: httpStatus.NOT_FOUND });
    }

    return new ApiDataResponse(httpStatus.OK, "soft delete success", deletedOrder);
};

const hardDeleteOrder = async (orderId) => {
    const deletedOrder = await Order.destroy({ where: { id: orderId } });
    if (!deletedOrder) {
        throw new APIError({ message: "Order not found", status: httpStatus.NOT_FOUND });
    }

    return new ApiDataResponse(httpStatus.OK, "hard delete success", deletedOrder);
};

export { addOrder, updateOrder, getOrderDetail, getListOrders, softDeleteOrder, hardDeleteOrder };
