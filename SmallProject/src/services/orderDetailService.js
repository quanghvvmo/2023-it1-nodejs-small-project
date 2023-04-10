import { v4 as uuidv4 } from "uuid";
import db from "../models/index";

const createOrderDetail = async (data) => {
    let newId = uuidv4();
    const newOrderDetail = await db.OrderDetail.create({
        id: newId,
        orderid: data.orderid,
        productid: data.productid,
        price: data.price,
        tax: data.tax,
        discount: data.discount,
        totalPrice: data.totalPrice,
        isDeleted: data.isDeleted,
        createBy: data.createBy,
        updateBy: data.updateBy
    })
    return ({
        newOrderDetail,
        errCode: 0,
        errMsg: 'Add new Order Detail sucessfull!'
    })
}

const getAllOrderDetail = async (page) => {
    let orderDetails = {}
    if (!page) {
        orderDetails = await db.OrderDetail.findAll({
            where: {
                isDeleted: 0
            }
        });
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 orders, With 1 page we skip 5 objects
        orderDetails = await db.OrderDetail.findAndCountAll({
            limit: 5,
            offset: offset,
            where: {
                isDeleted: 0
            }
        })
    }
    return ({
        orderDetails,
        pageIndex: page,
        pageSize: 5,
        totalCount: orderDetails.count,
        totalPage: Math.round(orderDetails.count / 5),
        errCode: 0,
        errMsg: 'Success',
    })
}

const getOrderDetailbyId = async (inputId) => {
    const orderDetail = await db.OrderDetail.findOne({
        where: {
            id: inputId
        }
    });
    if (orderDetail) {
        return ({
            orderDetail,
            errCode: 0,
            errMsg: 'Ok',
        })
    } else {
        return ({
            errCode: -1,
            errMsg: 'Not found order detail!'
        })
    }
}
const hardDelete = async (inputId) => {
    let orderDetail = await db.OrderDetail.findOne({
        where: {
            id: inputId
        }
    })
    if (orderDetail) {
        await db.OrderDetail.destroy({
            where: { id: inputId }
        });
        return ({
            errCode: 0,
            errMsg: 'The order detail is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found order detail'
    })
}
const softDelete = async (inputId) => {
    let orderDetail = await db.OrderDetail.findOne({
        where: {
            id: inputId,
            isDeleted: false
        },
        raw: false
    })
    if (orderDetail) {
        orderDetail.isDeleted = true;
        await orderDetail.save();
        return ({
            orderDetail,
            errCode: 0,
            errMsg: 'The order detail is soft deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Order detail not found or is already soft deleted!'
    })
}
const updateOrderDetail = async (data) => {
    let orderDetail = await db.OrderDetail.findOne({
        where: {
            id: data.id
        },
        raw: false
    })
    if (!orderDetail) {
        return ({
            errCode: -1,
            errMsg: "Order detail not found!"
        })
    } else {
        const validOrder = await db.Order.findOne({
            where: {
                id: data.orderid
            }
        })
        const validProduct = await db.Product.findOne({
            where: {
                id: data.productid
            }
        })
        if (validOrder && validProduct) {
            orderDetail.orderid = data.orderid,
                orderDetail.productid = data.productid,
                orderDetail.price = data.price,
                orderDetail.tax = data.tax,
                orderDetail.discount = data.discount,
                orderDetail.totalPrice = data.totalPrice,
                orderDetail.isDeleted = data.isDeleted,
                orderDetail.createBy = data.createBy,
                orderDetail.updateBy = data.updateBy
            await orderDetail.save();
            return ({
                order,
                errCode: 0,
                errMsg: "Updating succesfull!"
            })
        } else {
            return ({
                errCode: 1,
                errMsg: "Invalid Order or Product!"
            })
        }
    }
}
module.exports = {
    createOrderDetail: createOrderDetail,
    getAllOrderDetail: getAllOrderDetail,
    getOrderDetailbyId: getOrderDetailbyId,
    hardDelete: hardDelete,
    softDelete: softDelete,
    updateOrderDetail: updateOrderDetail
}