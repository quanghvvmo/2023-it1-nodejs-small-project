const { Customer } = require('../models/Customer');

class CustomerService {
    async createCustomer(data) {
        try {
            const { userId } = data
            const customer = await Customer.create({
                userId,
                isActive: 1,
                ...data
            });
            return {
                ...customer
            };
        } catch (error) {
            throw new Error('Failed to create customer');
        }
    }

    async updateCustomer(id, data) {
        try {
            const [ rows ] = await Customer.update(data, {
                where: { id },
                returning: true
            });
            return rows[0];
        } catch (error) {
            throw new Error('Failed to update customer');
        }
    }

    async deleteCustomer(id) {
        try {
            const rowsDeleted = await Customer.destroy({
                where: { id }
            });
            return rowsDeleted;
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async getListCustomers(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const users = await Customer.findAll({
                limit,
                offset
            });
            return users;
        } catch (error) {
            throw new Error('Failed to get list of customers');
        }
    }

    async getCustomerDetail(id) {
        try {
            const customer = await Customer.findByPk(id);
            if(!customer) {
                throw new Error('Customer not exists');
            }
            return customer;
        } catch (error) {
            throw new Error(`Failed to get an customer - ${id}`);
        }
    }
}

module.exports = new CustomerService();