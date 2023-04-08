const sequelize = require('../models/dbconfig');
const { User, Customer, Order } = sequelize.models;
const APIError = require('../helper/apiError');
const { ApiResponse, ApiPagingResponse } = require('../helper/apiResponse');
const customerMessage = require('../constants/customerMessage');
const userMessage = require('../constants/userMessage');
const httpStatus = require('http-status');

class CustomerService {
    createCustomer = async (data) => {
        const id = data.UserId;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw new APIError({ message: userMessage.USER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }   
        const customer = await Customer.create(data);
    
        return new ApiResponse(customer, httpStatus.CREATED, customerMessage.CUSTOMER_CREATED);
    };

    updateCustomer = async (id, data) => {
        const customer = await Customer.update(data, { where: { id } });
        if (!customer.at(0)) {
            throw new APIError({ message: customerMessage.CUSTOMER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        return new ApiDataResponse(customer, httpStatus.OK, customerMessage.CUSTOMER_UPDATED);
    };

    getCustomerDetail = async (id) => {
        const customer = await Customer.findOne({ include: [Order], where: { id } });
        if (!customer) {
            throw new APIError({ message: customerMessage.CUSTOMER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        return customer;
    };

    getListCustomers = async (pageIndex, pageSize) => {
        const customers = await Customer.findAll();
    
        const numOfCustomers = customers.length;
        if (!numOfCustomers) {
            throw new APIError({ message: customerMessage.CUSTOMER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        const totalPages = parseInt((numOfCustomers + pageSize - 1) / pageSize);
        if (pageIndex > totalPages) {
            throw new APIError({ message: customerMessage.INVALID_PAGGING, status: httpStatus.BAD_REQUEST });
        }
    
        const start = (pageIndex - 1) * limit;
        const end = startIndex + pageSize;
    
        return new ApiPagingResponse(
            customers.slice(start, end),
            pageIndex,
            pageSize,
            numOfCustomers,
            totalPages,
        );
    };

    hardDeleteCustomer = async (id) => {
        const customer = await Customer.destroy({ where: { id } });
        if (!customer) {
            throw new APIError({ message: "Customer not found", status: httpStatus.NOT_FOUND });
        }
    
        return new ApiDataResponse(customer, httpStatus.OK, customerMessage.CUSTOMER_HARD_DELETED);
    };

    softDeleteCustomer = async (id) => {
        const customer = await Customer.update(
            { isDeleted: true },
            { where: { id } }
        );
        if (!customer.at(0)) {
            throw new APIError({ message: customerMessage.CUSTOMER_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
    
        return new ApiDataResponse(customer, httpStatus.OK, customerMessage.CUSTOMER_SOFT_DELETED);
    };
}

module.exports = new CustomerService();