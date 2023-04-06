import productService from '../services/productService'
import { validateProduct } from "../validations/productValidation"


const createProduct = async (req, res) => {
    try {
        let data = req.body;
        let file = "";
        if (!req.file) {
            file = null;
        } else {
            file = req.file.filename;
        }
        console.log(file);
        const { error, value } = validateProduct.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await productService.createProduct(value, file);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getListProduct = async (req, res) => {
    try {
        const page = req.query.page;
        let result = await productService.getListProduct(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}
const getProductbyId = async (req, res) => {
    try {
        const productId = req.params.id;
        let result = await productService.getProductbyId(productId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const hardDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        let result = await productService.hardDeleteProduct(productId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const softDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        let result = await productService.softDeleteProduct(productId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const updateProduct = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing product id!"
            })
        }
        const { error, value } = validateProduct.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await productService.updateProduct(value);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
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