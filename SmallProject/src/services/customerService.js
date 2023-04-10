import { v4 as uuidv4 } from "uuid";
import db from "../models/index";

const createCustomer = async (data) => {
    let newId = uuidv4();
    const validUser = await db.User.findOne({
        where: {
            id: data.userid
        }
    })
    if (validUser) {
        const newCustomer = await db.Customer.create({
            id: newId,
            userid: data.userid,
            paymentMethod: data.paymentMethod,
            isActive: data.isActive
        })
        return ({
            newCustomer,
            errCode: 0,
            errMsg: 'Create Customer Succesfull!'
        })
    } else {
        return ({
            errCode: -1,
            errMsg: 'Invalid User!'
        })
    }

}

const getAllCustomer = async (page) => {
    let customers = {}
    if (!page) {
        customers = await db.Customer.findAll();
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 customers 
        customers = await db.Customer.findAndCountAll({
            limit: 5,
            offset: offset
        })
    }
    return ({
        customers,
        pageIndex: page,
        pageSize: 5,
        totalCount: customers.count,
        totalPage: Math.round(customers.count / 5),
        errCode: 0,
        errMsg: 'Success',
    })
}

const getCustomerbyId = async (customerId) => {
    const customer = await db.Customer.findAll({
        where: {
            id: customerId
        },
        include: [
            {
                model: db.Order,
                as: "orderData"
            }
        ],
        raw: true,
        nest: true
    });
    if (customer && customer.length > 0) {
        return ({
            customer,
            errCode: 0,
            errMsg: 'Ok',
        })
    } else {
        return ({
            errCode: -1,
            errMsg: 'Not found customer'
        })
    }
}

const activeCustomer = async (customerId) => {
    let customer = await db.Customer.findOne({
        where: {
            id: customerId,
            isActive: false
        },
        raw: false
    })
    if (customer) {
        customer.isActive = 1;
        await customer.save();
        return ({
            customer,
            errCode: 0,
            errMsg: "Active successfully"
        })
    } else return ({
        errCode: -1,
        errMsg: 'Customer not found or is already actived!'
    })
}
const inactiveCustomer = async (customerId) => {
    let customer = await db.Customer.findOne({
        where: {
            id: customerId,
            isActive: true
        },
        raw: false
    })
    if (customer) {
        customer.isActive = 0;
        await customer.save();
        return ({
            customer,
            errCode: 0,
            errMsg: "Inactive successfully"
        })
    } else return ({
        errCode: -1,
        errMsg: 'Customer not found or is already inactived!'
    })
}
const deleteCustomer = async (customerId) => {
    let customer = await db.Customer.findOne({
        where: {
            id: customerId
        }
    })
    if (customer && customer.length > 0) {
        await db.Customer.destroy({
            where: { id: customerId }
        });
        let ownOrder = await db.Order.findAll({
            where: {
                customerid: customerId
            },
            raw: false
        })
        if (ownOrder && ownOrder.length > 0) {
            for (let i = 0; i < ownOrder.length; i++) {
                ownOrder[i].customerid = null;
                await ownOrder[i].save();
            }
        }
        return ({
            errCode: 0,
            errMsg: 'The customer is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found customer'
    })
}
const updateCustomer = async (data) => {
    let duplicateUser = await db.Customer.findOne({
        where: {
            id: data.userid
        }
    })
    if (duplicateUser) {
        return ({
            errCode: 1,
            errMsg: "The User is already have Customer!"
        })
    } else {
        let validUser = await db.User.findOne({
            where: {
                id: data.userid
            }
        })
        if (validUser) {
            let customer = await db.Customer.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (customer) {
                customer.userid = data.userid,
                    customer.paymentMethod = data.paymentMethod,
                    customer.isActive = data.isActive
                await customer.save();
                return ({
                    errCode: 0,
                    errMsg: "Updating customer succesfull!"
                })
            } else {
                return ({
                    errCode: -1,
                    errMsg: "Customer not found!"
                })
            }
        } else {
            return ({
                errCode: 2,
                errMsg: "User isn't exsit!"
            })
        }
    }
}
module.exports = {
    createCustomer: createCustomer,
    getAllCustomer: getAllCustomer,
    getCustomerbyId: getCustomerbyId,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
    inactiveCustomer: inactiveCustomer,
    activeCustomer: activeCustomer

}