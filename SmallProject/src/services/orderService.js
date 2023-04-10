import { v4 as uuidv4 } from "uuid";
import db from "../models/index";

const createOrder = async (data) => {
    let newId = uuidv4();
    const newOrder = await db.Order.create({
        id: newId,
        customerid: data.customerid,
        price: data.price,
        tax: data.tax,
        discount: data.discount,
        totalPrice: data.totalPrice,
        isDeleted: data.isDeleted,
        createBy: data.createBy,
        updateBy: data.updateBy
    })
    return ({
        newOrder,
        errCode: 0,
        errMsg: 'Add new Order sucessfull!'
    })
}
const getAllOrder = async (page) => {
    let orders = {}
    if (!page) {
        orders = await db.Order.findAll({
            where: {
                isDeleted: 0
            }
        });
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 orders, With 1 page we skip 5 objects
        orders = await db.Order.findAndCountAll({
            limit: 5,
            offset: offset,
            where: {
                isDeleted: 0
            }
        })
    }
    return ({
        orders,
        pageIndex: page,
        pageSize: 5,
        totalCount: orders.count,
        totalPage: Math.round(orders.count / 5),
        errCode: 0,
        errMsg: 'Success',
    })
}

const getOrderbyId = async (orderId) => {
    const order = await db.Order.findOne({
        where: {
            id: orderId
        }
    });
    if (order) {
        return ({
            order,
            errCode: 0,
            errMsg: 'Ok',
        })
    } else {
        return ({
            errCode: -1,
            errMsg: 'Not found order!'
        })
    }
}
const hardDeleteOrder = async (orderId) => {
    let order = await db.Order.findOne({
        where: {
            id: orderId
        },
        raw: false
    })
    if (order) {
        await order.destroy();
        let ownOrderDetail = await db.OrderDetail.findOne({
            where: {
                orderid: orderId
            },
            raw: false
        })
        if (ownOrderDetail) {
            ownOrderDetail.orderid = null;
            await ownOrderDetail.save();
        }
        return ({
            errCode: 0,
            errMsg: 'The order is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found order'
    })
}
const softDeleteOrder = async (orderId) => {
    let order = await db.Order.findOne({
        where: {
            id: orderId,
            isDeleted: false
        },
        raw: false
    })
    if (order) {
        order.isDeleted = true;
        await order.save();
        return ({
            order,
            errCode: 0,
            errMsg: 'The order is soft deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Order not found or is already soft deleted!'
    })
}

const updateOrder = async (data) => {
    let order = await db.Order.findOne({
        where: {
            id: data.id
        },
        raw: false
    })
    if (!order) {
        return ({
            errCode: -1,
            errMsg: "Order not found!"
        })
    } else {
        const validCustomer = await db.Customer.findOne({
            where: {
                id: data.customerid
            }
        })
        if (validCustomer) {
            order.customerid = data.customerid,
                order.price = data.price,
                order.tax = data.tax,
                order.discount = data.discount,
                order.totalPrice = data.totalPrice,
                order.isDeleted = data.isDeleted,
                order.createBy = data.createBy,
                order.updateBy = data.updateBy
            await order.save();
            return ({
                order,
                errCode: 0,
                errMsg: "Updating succesfull!"
            })
        } else {
            return ({
                errCode: 1,
                errMsg: "Invalid Customer!"
            })
        }
    }
}

module.exports = {
    createOrder: createOrder,
    getAllOrder: getAllOrder,
    getOrderbyId: getOrderbyId,
    hardDeleteOrder: hardDeleteOrder,
    softDeleteOrder: softDeleteOrder,
    updateOrder: updateOrder
}