import productService from '../services/productService'

let checkInput = (inputData) => {
    let arr = [
        "name",
        "description",
    ];
    let isValid = true;
    let element = "";
    for (let i = 0; i < arr.length; i++) {
        if (!inputData[arr[i]]) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element,
    };
};
let createProduct = async (req, res) => {
    let data = req.body
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await productService.createProduct(data);
    if (result.errCode === 0) {
        return res.status(200).json(result.errMsg);
    }
}
let getListProduct = async (req, res) => {
    let page = req.query.page;
    let result = await productService.getListProduct(page);
    if (result.errCode === 0) {
        return res.status(200).json(result.products);
    }
}
let getProductbyId = async (req, res) => {
    let productId = req.params.id;
    let result = await productService.getProductbyId(productId);
    if (result.errCode === -1) {
        return res.status(404).json(result.errMsg);
    } else return res.status(200).json(result.product)
}
let hardDeleteProduct = async (req, res) => {
    let productId = req.params.id
    let result = await productService.hardDeleteProduct(productId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else return res.status(200).json(result);
}
let softDeleteProduct = async (req, res) => {
    let productId = req.params.id
    let result = await productService.softDeleteProduct(productId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else if (result.errCode === 1) {
        return res.status(200).json(result);
    } else return res.status(200).json(result);
}
let updateProduct = async (req, res) => {
    let data = req.body;
    if (!data.id) {
        return res.status(400).json({
            errMsg: "Missing product id!"
        })
    }
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await productService.updateProduct(data);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else return res.status(200).json(result)
}
module.exports = {
    createProduct: createProduct,
    getListProduct: getListProduct,
    getProductbyId: getProductbyId,
    hardDeleteProduct: hardDeleteProduct,
    softDeleteProduct: softDeleteProduct,
    updateProduct: updateProduct
}