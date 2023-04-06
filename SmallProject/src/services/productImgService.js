import db from "../models/index"
import { v4 as uuidv4 } from "uuid";

const createProductImg = async (data) => {
    let newId = uuidv4();
    const newProductImg = await db.ProductImage.create({
        id: newId,
        name: data.name,
        productid: data.productid,
        url: data.url,
        isDeleted: data.isDeleted,
        createBy: data.createBy,
        updateBy: data.updateBy
    })
    return ({
        newProductImg,
        errCode: 0,
        errMsg: "Creating product image succesfull!"
    })
}

const getListProductImg = async (page) => {
    let productImgs = {}
    if (!page) {
        productImgs = await db.ProductImage.findAll({
            where: {
                isDeleted: 0
            }
        });
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 products, With 1 page we skip 5 objects
        productImgs = await db.ProductImage.findAndCountAll({
            limit: 5,
            offset: offset,
            where: {
                isDeleted: 0
            }
        })
    }
    return ({
        productImgs,
        errCode: 0,
        errMsg: 'Success',
    })
}
const getProductImgbyId = async (inputId) => {
    let productImg = await db.ProductImage.findOne({
        where: {
            id: inputId
        }
    });
    if (productImg) {
        return ({
            productImg,
            errCode: 0,
            errMsg: 'Ok'
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found product image'
    })
}
const hardDelete = async (inputId) => {
    let productImg = await db.ProductImage.findOne({
        where: {
            id: inputId
        }
    })
    if (productImg) {
        await db.ProductImage.destroy({
            where: { id: inputId }
        });
        return ({
            errCode: 0,
            errMsg: 'The product image is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found product image'
    })
}
const softDelete = async (inputId) => {
    let product = await db.ProductImage.findOne({
        where: {
            id: inputId,
            isDeleted: false
        },
        raw: false
    })
    if (product) {
        product.isDeleted = true;
        await product.save();
        return ({
            errCode: 0,
            errMsg: 'The product imgage is soft deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found product image'
    })
}

const updateProductImg = async (data) => {
    let productImg = await db.ProductImage.findOne({
        where: {
            id: data.id
        },
        raw: false
    })
    if (!productImg) {
        return ({
            errCode: -1,
            errMsg: "Product image not found!"
        })
    } else {
        const validProduct = await db.Product.findOne({
            where: {
                id: data.productid
            }
        })
        if (validProduct) {
            productImg.name = data.name,
                productImg.productid = data.productid,
                productImg.url = data.url,
                productImg.isDeleted = data.isDeleted,
                productImg.createBy = data.createBy,
                productImg.updateBy = data.updateBy
            await productImg.save();
            return ({
                errCode: 0,
                errMsg: "Updating succesfull!"
            })
        } else {
            return ({
                errCode: 1,
                errMsg: "Invalid Product!"
            })
        }

    }
}

module.exports = {
    createProductImg: createProductImg,
    getListProductImg: getListProductImg,
    getProductImgbyId: getProductImgbyId,
    hardDelete: hardDelete,
    softDelete: softDelete,
    updateProductImg: updateProductImg
}