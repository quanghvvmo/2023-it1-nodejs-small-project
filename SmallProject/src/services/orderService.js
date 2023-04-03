import { v4 as uuidv4 } from "uuid";
import db from "../models/index";
import { or } from "sequelize";

let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newId = uuidv4();
            await db.Order.create({
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
            resolve({
                errCode: 0,
                errMsg: 'Add new Order sucessfull!'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrder = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve({
                errCode: 0,
                errMsg: 'Success',
                orders
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getOrderbyId = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: {
                    id: orderId
                },
                raw: false
            });
            if (order) {
                resolve({
                    errCode: 0,
                    errMsg: 'Ok',
                    order
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found order'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let hardDeleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: {
                    id: orderId
                }
            })
            if (order) {
                await db.Order.destroy({
                    where: { id: orderId }
                });
                resolve({
                    errCode: 0,
                    errMsg: 'The order is deleted',
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found order'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let softDeleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: {
                    id: orderId
                },
                raw: false
            })
            if (order) {
                if (order.isDeleted === true) {
                    resolve({
                        errCode: 1,
                        errMsg: "The order is already Soft Deleted"
                    })
                } else {
                    order.isDeleted = 1;
                    await order.save();
                    resolve({
                        errCode: 0,
                        errMsg: 'The order is soft deleted',
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found order'
            })
        } catch (error) {
            reject(error);
        }
    })
}

let updateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (!order) {
                resolve({
                    errCode: -1,
                    errMsg: "Order not found!"
                })
            } else {
                order.customerid = data.customerid,
                    order.price = data.price,
                    order.tax = data.tax,
                    order.discount = data.discount,
                    order.totalPrice = data.totalPrice,
                    order.isDeleted = data.isDeleted,
                    order.createBy = data.createBy,
                    order.updateBy = data.updateBy
                await order.save();
                resolve({
                    errCode: 0,
                    errMsg: "Updating succesfull!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createOrder: createOrder,
    getAllOrder: getAllOrder,
    getOrderbyId: getOrderbyId,
    hardDeleteOrder: hardDeleteOrder,
    softDeleteOrder: softDeleteOrder,
    updateOrder: updateOrder
}