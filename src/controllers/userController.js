const userService = require('../services/userService');
const { User } = require('../models/User');

class UserController {
    async createUser(req, res) {
        try {
            const { username } = req.body;
            const existingUser = await User.findOne({ where: { username }});
            if(existingUser) {
                return res.status(404).json({ message: 'User existed' });
            }
            const user = await userService.createUser({ 
                ...req.body,
                isActive: 1,
                createdAt: new Date()
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user || !user.comparePassword(password, user.password)) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateUser(req, res) {
        try {
            const { username } = req.body;
            const existingUser = await User.findOne({ where: { username }});
            if(!existingUser) {
                return res.status(404).json({ message: 'User not existed' });
            }
            const updateUser = userService.updateUser(existingUser.id, { ...req.body });
            res.status(200).json(updateUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(404).json({ message: 'User not existed' });
            }
            await userService.deleteUser(id);
            return res.status(200).json({ message: `Deleted user - ${ id }` });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getListUsers(req, res) {
        try {
            const { page, limit } = req.query;
            if (page <= 0 || limit <= 0) {
                return res.status(404).json({ message: "Parameters aren't accepted" });
            }
            const users = await userService.getListUsers(page, limit);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getUserDetail(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserDetail(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new UserController();