import customerService from "../services/customerService"

let checkInput = (inputData) => {
    let arr = [
        "userid",
        "isActive"
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

let createCustomer = async (req, res) => {
    let data = req.body;
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await customerService.createCustomer(data);
    if (result.errCode === 0) {
        return res.status(200).json(result.errMsg);
    }
}

let getAllCustomer = async (req, res) => {
    let page = req.query.page
    let result = await customerService.getAllCustomer(page);
    if (result.errCode === 0) {
        return res.status(200).json(result.customers);
    }
}
let getCustomerbyId = async (req, res) => {
    let customerId = req.params.id;
    let result = await customerService.getCustomerbyId(customerId);
    if (result.errCode === -1) {
        return res.status(404).json(result.errMsg);
    } else return res.status(200).json(result.customer)
};

let activeCustomer = async (req, res) => {
    let customerId = req.params.id
    let result = await customerService.activeCustomer(customerId);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else if (result.errCode === 2) {
        return res.status(201).json(result);
    } else return res.status(200).json(result)
};
let inactiveCustomer = async (req, res) => {
    let customerId = req.params.id
    let result = await customerService.inactiveCustomer(customerId);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else if (result.errCode === 2) {
        return res.status(201).json(result);
    } else return res.status(200).json(result)
};
let deleteCustomer = async (req, res) => {
    let customerId = req.params.id
    let result = await customerService.deleteCustomer(customerId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else return res.status(200).json(result);
};
let updateCustomer = async (req, res) => {
    let data = req.body;
    if (!data.id) {
        return res.status(400).json({
            errMsg: "Missing Customer id!"
        })
    }
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let result = await customerService.updateCustomer(data);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else if (result.errCode === 1) {
        return res.status(400).json(result);
    } else if (result.errCode === 2) {
        return res.status(400).json(result);
    } else {
        return res.status(200).json(result)
    }
};

module.exports = {
    createCustomer: createCustomer,
    getAllCustomer: getAllCustomer,
    getCustomerbyId: getCustomerbyId,
    deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer,
    activeCustomer: activeCustomer,
    inactiveCustomer: inactiveCustomer
}
