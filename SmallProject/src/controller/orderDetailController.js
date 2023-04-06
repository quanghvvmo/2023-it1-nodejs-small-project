import oderDetailService from "../services/orderDetailService";
import { validateOrderDetail } from "../validations/orderValidation"

const createOrderDetail = async (req, res) => {
    try {
        let data = req.body;
        const { error, value } = validateOrderDetail.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await oderDetailService.createOrderDetail(value);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllOrderDetail = async (req, res) => {
    try {
        const page = req.query.page
        let result = await oderDetailService.getAllOrderDetail(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getOrderDetailbyId = async (req, res) => {
    try {
        const inputId = req.params.id;
        let result = await orderService.getOrderDetailbyId(inputId);
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
        let result = await oderDetailService.hardDelete(inputId);
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
        let result = await oderDetailService.softDelete(inputId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const updateOrderDetail = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing order detail id!"
            })
        }
        const { error, value } = validateOrderDetail.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await oderDetailService.updateOrderDetail(value);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else if (result.errCode === 1) {
            return res.status(400).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    createOrderDetail: createOrderDetail,
    getAllOrderDetail: getAllOrderDetail,
    getOrderDetailbyId: getOrderDetailbyId,
    hardDelete: hardDelete,
    softDelete: softDelete,
    updateOrderDetail: updateOrderDetail
}