import db from "../config/database"
import { v4 as uuidv4 } from "uuid";

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newId = uuidv4();
            await db.Product.create({
                id: newId,
                name: data.name,
                description: data.description,
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
                errMsg: "Creating product succesfull!"
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getListProduct = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = {}
            if (!page) {
                products = await db.Product.findAll({
                    where: {
                        isDeleted: 0
                    }
                });
            } else {
                const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 products, With 1 page we skip 5 objects
                orders = await db.Product.findAndCountAll({
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

let getProductbyId = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: productId
                },
                raw: false
            });
            if (product) {
                resolve({
                    errCode: 0,
                    errMsg: 'Ok',
                    product
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found product'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let hardDeleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: productId
                }
            })
            if (product) {
                await db.Product.destroy({
                    where: { id: productId }
                });
                resolve({
                    errCode: 0,
                    errMsg: 'The product is deleted',
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found product'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let softDeleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: productId
                },
                raw: false
            })
            if (product) {
                if (product.isDeleted === true) {
                    resolve({
                        errCode: 1,
                        errMsg: "The product is already Soft Deleted"
                    })
                } else {
                    product.isDeleted = 1;
                    await product.save();
                    resolve({
                        errCode: 0,
                        errMsg: 'The order is soft deleted',
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found product'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let updateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (!product) {
                resolve({
                    errCode: -1,
                    errMsg: "Product not found!"
                })
            } else {
                product.name = data.name,
                    product.description = data.description,
                    product.price = data.price,
                    product.tax = data.tax,
                    product.discount = data.discount,
                    product.totalPrice = data.totalPrice,
                    product.isDeleted = data.isDeleted,
                    product.createBy = data.createBy,
                    product.updateBy = data.updateBy
                await product.save();
                resolve({
                    errCode: 0,
                    errMsg: "Updating succesfull!"
                })

                resolve({
                    errCode: 1,
                    errMsg: "Invalid Customer!"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createProduct: createProduct,
    getListProduct: getListProduct,
    getProductbyId: getProductbyId,
    hardDeleteProduct: hardDeleteProduct,
    softDeleteProduct: softDeleteProduct,
    updateProduct: updateProduct
}