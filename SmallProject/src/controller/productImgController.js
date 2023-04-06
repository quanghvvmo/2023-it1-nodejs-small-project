import productImgService from '../services/productImgService'
import { validateProductimage } from "../validations/productValidation"

const createProductImg = async (req, res) => {
    try {
        let data = req.body
        const { error, value } = validateProductimage.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await productImgService.createProductImg(value);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getListProductImg = async (req, res) => {
    try {
        const page = req.query.page;
        let result = await productImgService.getListProductImg(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}

const getProductImgbyId = async (req, res) => {
    try {
        const inputId = req.params.id;
        let result = await productImgService.getProductImgbyId(inputId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const hardDelete = async (req, res) => {
    try {
        const inputId = req.params.id
        let result = await productImgService.hardDelete(inputId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const softDelete = async (req, res) => {
    try {
        const inputId = req.params.id
        let result = await productImgService.softDelete(inputId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateProductImg = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing product image id!"
            })
        }
        const { error, value } = validateProductimage.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await productImgService.updateProductImg(value);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else if (result.errCode === 1) {
            return res.status(400).json(result);
        }
        else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
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