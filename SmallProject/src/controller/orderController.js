import orderService from "../services/orderService"

let checkInput = (inputData) => {
    let arr = [
        "customerid",
        "price",
        "tax",
        "discount",
        "totalPrice",
        "isDeleted"
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

let createOrder = async (req, res) => {
    let data = req.body;
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await orderService.createOrder(data);
    if (result.errCode === 0) {
        return res.status(200).json(result.errMsg);
    }
}

let getAllOrder = async (req, res) => {
    let page = req.query.page
    let result = await orderService.getAllOrder(page);
    if (result.errCode === 0) {
        return res.status(200).json(result.orders);
    }
}
let getOrderbyId = async (req, res) => {
    let orderId = req.params.id;
    let result = await orderService.getOrderbyId(orderId);
    if (result.errCode === -1) {
        return res.status(404).json(result.errMsg);
    } else return res.status(200).json(result.order)
}

let hardDeleteOrder = async (req, res) => {
    let orderId = req.params.id
    let result = await orderService.hardDeleteOrder(orderId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else return res.status(200).json(result);
}
let softDeleteOrder = async (req, res) => {
    let orderId = req.params.id
    let result = await orderService.softDeleteOrder(orderId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else if (result.errCode === 1) {
        return res.status(200).json(result);
    } else return res.status(200).json(result);
}
let updateOrder = async (req, res) => {
    let data = req.body;
    if (!data.id) {
        return res.status(400).json({
            errMsg: "Missing Order id!"
        })
    }
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await orderService.updateOrder(data);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else return res.status(200).json(result)
}


module.exports = {
    createOrder: createOrder,
    getAllOrder: getAllOrder,
    getOrderbyId: getOrderbyId,
    hardDeleteOrder: hardDeleteOrder,
    softDeleteOrder: softDeleteOrder,
    updateOrder: updateOrder
}