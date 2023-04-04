const { User } = require('../models/User');

class UserService {
    async createUser(data) {
        try {
            const user = User.create({
                ...data
            });
            return user;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async loginUser(data) {
        try {
            const username = data.username;
            const user = User.findOne({ 
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
            return rowsDeleted;
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

}

module.exports = new UserService();