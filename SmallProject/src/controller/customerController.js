import customerService from "../services/customerService"
import { validateCustomer } from "../validations/customerValidation";

const createCustomer = async (req, res) => {
    try {
        let data = req.body;
        const { error, value } = validateCustomer.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await customerService.createCustomer(value);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        } else return res.status(400).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllCustomer = async (req, res) => {
    try {
        const page = req.query.page
        let result = await customerService.getAllCustomer(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}
const getCustomerbyId = async (req, res) => {
    try {
        const customerId = req.params.id;
        let result = await customerService.getCustomerbyId(customerId);
        if (result.errCode === -1) {
            return res.status(404).json(result.errMsg);
        } else return res.status(200).json(result.customer)
    } catch (error) {
        return res.status(500).json(error);
    }
};

const activeCustomer = async (req, res) => {
    try {
        const customerId = req.params.id
        let result = await customerService.activeCustomer(customerId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }

};
const inactiveCustomer = async (req, res) => {
    try {
        const customerId = req.params.id
        let result = await customerService.inactiveCustomer(customerId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }

};
const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id
        let result = await customerService.deleteCustomer(customerId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }

};
const updateCustomer = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing Customer id!"
            })
        }
        const { error, value } = validateCustomer.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await customerService.updateCustomer(value);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else if (result.errCode === 1) {
            return res.status(400).json(result);
        } else if (result.errCode === 2) {
            return res.status(400).json(result);
        } else {
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(500).json(error);
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
