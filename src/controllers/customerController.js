const customerService = require("../services/customerService");
const customerValidation = require("../validations/customerValidation");
const config = require('../config/index');
const httpStatus = require('http-status');

class CustomerController {
    createCustomer = async (req, res, next) => {
        try {
            const { error, value } = customerValidation.createCustomerSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
            }
    
            const customer = await customerService.createCustomer(value);
            return res.status(httpStatus.CREATED).json(customer);
        } catch (error) {
            next(error);
        }
    };

    updateCustomer = async (req, res, next) => {
        try {
            const { id } = req.params
            const { error, value } = customerValidation.updateCustomerSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
            }
    
            const customer = await customerService.updateCustomer(id, value);
            return res.status(httpStatus.OK).json(customer);
        } catch (error) {
            next(error);
        }
    };

    getCustomerDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await customerService.getCustomerDetail(id);
            return res.status(httpStatus.OK).json(customer);
        } catch (error) {
            next(error);
        }
    };

    getListCustomers = async (req, res, next) => {
        try {
            const pageIndex = parseInt(req.query.pageIndex) || config.DEFAULT_INDEX_PAGING;
            const pageSize = parseInt(req.query.pageSize) || config.DEFAULT_SIZE_PAGING;
            const customers = await customerService.getListCustomers(pageIndex, pageSize);
            return res.status(httpStatus.OK).json(customers);
        } catch (error) {
            next(error);
        }
    };

    hardDeleteCustomer = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await customerService.hardDeleteCustomer(id);
            return res.status(httpStatus.OK).json(customer);
        } catch (error) {
            next(error);
        }
    };
    
    softDeleteCustomer = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await customerService.softDeleteCustomer(id);
            return res.status(httpStatus.OK).json(customer);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new CustomerController();