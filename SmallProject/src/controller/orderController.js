import orderService from "../services/orderService";
import { validateOrder } from "../validations/orderValidation"

const createOrder = async (req, res) => {
    try {
        let data = req.body;
        const { error, value } = validateOrder.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await orderService.createOrder(value);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllOrder = async (req, res) => {
    try {
        const page = req.query.page
        let result = await orderService.getAllOrder(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getOrderbyId = async (req, res) => {
    try {
        const orderId = req.params.id;
        let result = await orderService.getOrderbyId(orderId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const hardDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        let result = await orderService.hardDeleteOrder(orderId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const softDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        let result = await orderService.softDeleteOrder(orderId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateOrder = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing order id!"
            })
        }
        const { error, value } = validateOrder.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await orderService.updateOrder(value);
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
    createOrder: createOrder,
    getAllOrder: getAllOrder,
    getOrderbyId: getOrderbyId,
    hardDeleteOrder: hardDeleteOrder,
    softDeleteOrder: softDeleteOrder,
    updateOrder: updateOrder
}