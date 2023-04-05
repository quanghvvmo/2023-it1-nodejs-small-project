const customerService = require('../services/customerService');
const { Customer } = require('../models/Customer');
const { User } = require('../models/User');

class CustomerController {
    async createCustomer(req, res) {
        try {
            const { userId } = req.body;
            const existingUser = await User.findOne({ where: { id: userId }});
            if(existingUser) {
                return res.status(404).json({ message: 'User existed' });
            }
            const customer = await customerService.createCustomer({ 
                userId,
                isActive: 1,
                ...req.body
            });
            return res.status(201).json(customer);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateCustomer(req, res) {
        try {
            const { id } = req.body;
            const existingCustomer = await Customer.findOne({ where: { id }});
            if(!existingCustomer) {
                return res.status(404).json({ message: 'Customer not existed' });
            }
            const updateCustomer = customerService.updateCustomer(id, { ...req.body });
            res.status(200).json(updateCustomer);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteCustomer(req, res) {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if(!customer) {
                return res.status(404).json({ message: 'Customer not existed' });
            }
            await customerService.deleteCustomer(id);
            return res.status(200).json({ message: `Deleted user - ${ id }` });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getListCustomers(req, res) {
        try {
            const { page, limit } = req.query;
            if (page <= 0 || limit <= 0) {
                return res.status(404).json({ message: "Parameters aren't accepted" });
            }
            const customers = await customerService.getListCustomers(page, limit);
            return res.status(200).json(customers);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getCustomerDetail(req, res) {
        try {
            const { id } = req.params;
            const user = await customerService.getCustomerDetail(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new CustomerController();