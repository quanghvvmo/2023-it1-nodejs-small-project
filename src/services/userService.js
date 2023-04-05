const { User } = require('../models/User');
const { Customer } = require('../models/Customer');

class UserService {
    async createUser(data) {
        try {
            const user = await User.create({
                ...data
            });
            const userId = user.id;
            const customer = await Customer.create({
                userId,
                isActive: 1
            });
            return {
                user,
                customer
            };
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async loginUser(data) {
        try {
            const username = data.username;
            const user = await User.findOne({ 
                where: { username }
            });
            return user;
        } catch (error) {
            throw new Error('Failed to login');
        }
    }

    async updateUser(id, data) {
        try {
            const [ rows ] = await User.update(data, {
                where: { id },
                returning: true
            });
            return rows[0];
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async deleteUser(id) {
        try {
            const rowsDeleted = await User.destroy({
                where: { id }
            });
            await Customer.destroy({ where: { userId: id }});
            return rowsDeleted;
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async getListUsers(page, limit) {
        try {
            const offset = (page - 1) * limit;
            const users = await User.findAll({
                limit,
                offset,
                include: [{ model: Customer, where: { userId: Sequelize.col('User.id') } }]
            });
            return users;
        } catch (error) {
            throw new Error('Failed to get list of users');
        }
    }

    async getUserDetail(id) {
        try {
            const user = await User.findByPk(id);
            if(!user) {
                throw new Error('User not exists');
            }
            return user;
        } catch (error) {
            throw new Error(`Failed to get an user - ${id}`);
        }
    }
}

module.exports = new UserService();