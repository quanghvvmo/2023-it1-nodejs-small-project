import { v4 as uuidv4 } from "uuid";
import db from "../models/index";

let createCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newId = uuidv4();
            await db.Customer.create({
                id: newId,
                userid: data.userid,
                paymentMethod: data.paymentMethod,
                isActive: data.isActive
            })
            resolve({
                errCode: 0,
                errMsg: 'Create Customer Succesfull!'
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllCustomer = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = {}
            if (!page) {
                customers = await db.Customer.findAll();
            } else {
                const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 customers 
                customers = await db.Customer.findAndCountAll({
                    limit: 5,
                    offset: offset,
                })
            }
            resolve({
                errCode: 0,
                errMsg: 'Success',
                customers
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getCustomerbyId = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findAll({
                where: {
                    id: customerId
                },
                include: [
                    {
                        model: db.Order,
                        as: "orderData"
                    }
                ],
                nest: true
            });
            if (customer) {
                resolve({
                    errCode: 0,
                    errMsg: 'Ok',
                    customer
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found customer'
            })
        } catch (error) {
            reject(error);
        }
    })
}

let activeCustomer = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    id: customerId,
                },
                raw: false
            })
            if (customer) {
                if (customer.isActive === true) {
                    resolve({
                        errCode: 2,
                        errMsg: 'The customer is already Actived',
                    })
                } else {
                    customer.isActive = 1;
                    await customer.save();
                    resolve({
                        errCode: 0,
                        errMsg: "Active successfully",
                        customer
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found customer'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let inactiveCustomer = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    id: userId,
                },
                raw: false
            })
            if (customer) {
                if (customer.isActive === false) {
                    resolve({
                        errCode: 2,
                        errMsg: 'The customer is already Inactived',
                    })
                } else {
                    customer.isActive = 0;
                    await customer.save();
                    resolve({
                        errCode: 0,
                        errMsg: "Inactive successfully",
                        customer
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found customer'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let deleteCustomer = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    id: customerId
                }
            })
            if (customer) {
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
                resolve({
                    errCode: 0,
                    errMsg: 'The customer is deleted',
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found customer'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let updateCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let duplicateUser = await db.Customer.findOne({
                where: {
                    id: data.userid
                }
            })
            if (duplicateUser) {
                resolve({
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
                        resolve({
                            errCode: 0,
                            errMsg: "Updating customer succesfull!"
                        })
                    } else {
                        resolve({
                            errCode: -1,
                            errMsg: "Customer not found!"
                        })
                    }
                } else {
                    resolve({
                        errCode: 2,
                        errMsg: `User isn't exsit!`
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
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