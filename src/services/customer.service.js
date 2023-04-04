import APIError from "../helper/apiError.js";
import httpStatus from "http-status";
import sequelize from "../models/index.js";

const { User, Customer } = sequelize.models;

const addCustomer = async (payload) => {
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
        throw new APIError({ message: "User not found !", status: httpStatus.NOT_FOUND });
    }

    const newCustomer = await Customer.create(payload);

    return newCustomer.id;
};

const getCustomerDetail = async (customerId) => {
    const customer = await Customer.findOne({ where: { id: customerId } });
    if (!customer) {
        throw new APIError({ message: "Customer not found !", status: httpStatus.NOT_FOUND });
    }

    return customer;
};

const getListCustomers = async (pageIndex, pageSize) => {
    const customers = await Customer.findAll();
    if (!customers.length) {
        throw new APIError({ message: "Customers not found !", status: httpStatus.NOT_FOUND });
    }

    const totalPages = Math.ceil(customers.length / pageSize);
    if (pageIndex > totalPages) {
        throw new APIError({ message: "Invalid page index", status: httpStatus.BAD_REQUEST });
    }

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return customers.slice(startIndex, endIndex);
};

const updateCustomer = async (customerId, payload) => {
    const updatedCustomer = await Customer.update(payload, { where: { id: customerId } });
    if (!updatedCustomer) {
        throw new APIError({ message: "Customer not found", status: httpStatus.NOT_FOUND });
    }

    return updatedCustomer.id;
};

const softDeleteCustomer = async (customerId) => {
    const updatedCustomer = await Customer.update(
        { isDeleted: true },
        { where: { id: customerId } }
    );
    if (!updatedCustomer) {
        throw new APIError({ message: "Customer not found", status: httpStatus.NOT_FOUND });
    }

    return updatedCustomer.id;
};

const hardDeleteCustomer = async (customerId) => {
    const deletedCustomer = await Customer.destroy({ where: { id: customerId } });
    if (!deletedCustomer) {
        throw new APIError({ message: "Customer not found", status: httpStatus.NOT_FOUND });
    }

    return customerId;
};

export {
    addCustomer,
    getCustomerDetail,
    getListCustomers,
    updateCustomer,
    softDeleteCustomer,
    hardDeleteCustomer,
};
