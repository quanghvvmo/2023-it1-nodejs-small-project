import httpStatus from "http-status";
import {
    addCustomer,
    getCustomerDetail,
    getListCustomers,
    updateCustomer,
    softDeleteCustomer,
    hardDeleteCustomer,
} from "../services/customer.service.js";
import { createCustomerSchema, updateCustomerSchema } from "../validations/customer.validation.js";

const createCustomerController = async (req, res, next) => {
    try {
        const { error, value } = createCustomerSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
        }

        const createdCustomer = await addCustomer(value);
        return res.status(httpStatus.CREATED).json(createdCustomer);
    } catch (error) {
        next(error);
    }
};

const getCustomerController = async (req, res, next) => {
    try {
        const customer = await getCustomerDetail(req.params.id);
        if (!customer) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Customer not found" });
        }
        return res.status(httpStatus.OK).json(customer);
    } catch (error) {
        next(error);
    }
};

const getCustomersController = async (req, res, next) => {
    try {
        const index = parseInt(req.query.index);
        const size = parseInt(req.query.size);
        if (isNaN(index) || isNaN(size) || index <= 0 || size <= 0) {
            return res.status(httpStatus.BAD_REQUEST).json("index or size is invalid");
        }

        const customers = await getListCustomers(index, size);
        return res.status(httpStatus.OK).json(customers);
    } catch (error) {
        next(error);
    }
};

const updateCustomerController = async (req, res, next) => {
    try {
        const { error, value } = updateCustomerSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
        }

        const updatedCustomer = await updateCustomer(req.params.id, value);
        return res.status(httpStatus.OK).json(updatedCustomer);
    } catch (error) {
        next(error);
    }
};

const hardDeleteCustomerController = async (req, res, next) => {
    try {
        const customerId = await hardDeleteCustomer(req.params.id);
        return res.status(httpStatus.OK).json(customerId);
    } catch (error) {
        next(error);
    }
};

const softDeleteCustomerController = async (req, res, next) => {
    try {
        const customerId = await softDeleteCustomer(req.params.id);
        return res.status(httpStatus.OK).json(customerId);
    } catch (error) {
        next(error);
    }
};

export {
    createCustomerController,
    getCustomerController,
    getCustomersController,
    updateCustomerController,
    hardDeleteCustomerController,
    softDeleteCustomerController,
};
