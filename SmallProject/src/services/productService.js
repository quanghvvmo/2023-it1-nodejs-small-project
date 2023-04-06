import db from "../models/index"
import { v4 as uuidv4 } from "uuid";

const createProduct = async (data, image) => {
    let newId = uuidv4();
    console.log(image);
    const newProduct = await db.Product.create({
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
    if (image) {
        let imageId = uuidv4();
        const newProductImage = await db.ProductImage.create({
            id: imageId,
            name: data.name,
            productid: newProduct.id,
            url: image,
            isDeleted: false
        })
        return ({
            newProduct,
            newProductImage,
            errCode: 1,
            errMsg: "Create product with image succesfull!"
        })
    }
    return ({
        newProduct,
        errCode: 0,
        errMsg: "Creating product succesfull!"
    })
}

const getListProduct = async (page) => {
    let products = {}
    if (!page) {
        products = await db.Product.findAll({
            where: {
                isDeleted: 0
            }
        });
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 products, With 1 page we skip 5 objects
        products = await db.Product.findAndCountAll({
            limit: 5,
            offset: offset,
            where: {
                isDeleted: 0
            }
        })
    }
    return ({
        products,
        errCode: 0,
        errMsg: 'Success',
    })
}

const getProductbyId = async (productId) => {
    let product = await db.Product.findOne({
        where: {
            id: productId
        }
    });
    if (product) {
        return ({
            product,
            errCode: 0,
            errMsg: 'Ok'
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found product'
    })
}
const hardDeleteProduct = async (productId) => {
    let product = await db.Product.findOne({
        where: {
            id: productId
        }
    })
    if (product) {
        await db.Product.destroy({
            where: { id: productId }
        });
        return ({
            errCode: 0,
            errMsg: 'The product is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found product'
    })
}
const softDeleteProduct = async (productId) => {
    let product = await db.Product.findOne({
        where: {
            id: productId
        },
        raw: false
    })
    if (product) {
        if (product.isDeleted === true) {
            return ({
                errCode: 1,
                errMsg: "The product is already Soft Deleted"
            })
        } else {
            product.isDeleted = 1;
            await product.save();
            return ({
                errCode: 0,
                errMsg: 'The order is soft deleted',
            })
        }
    } else return ({
        errCode: -1,
        errMsg: 'Not found product'
    })
}
const updateProduct = async (data) => {
    let product = await db.Product.findOne({
        where: {
            id: data.id
        },
        raw: false
    })
    if (!product) {
        return ({
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
        return ({
            errCode: 0,
            errMsg: "Updating succesfull!"
        })
    }
}
module.exports = {
    createProduct: createProduct,
    getListProduct: getListProduct,
    getProductbyId: getProductbyId,
    hardDeleteProduct: hardDeleteProduct,
    softDeleteProduct: softDeleteProduct,
    updateProduct: updateProduct
}