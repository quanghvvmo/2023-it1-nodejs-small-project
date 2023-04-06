const userService = require('../services/userService');
const httpStatus = require('http-status');
const userValidation = require('../validations/userValidation');
const config = require('../config/index');

class UserController {
    login = async (req, res, next) => {
        try {
            const { error, value } = userValidation.loginSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }
    
            const user = await userService.login(user);
            return res.status(httpStatus.OK).json({ user });
        } catch (error) {
            next(error);
        }
    };

    createUser = async (req, res, next) => {
        try {
            const { error, value } = userValidation.createUserSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }
            const user = await userService.createUser(value);
            return res.status(httpStatus.CREATED).json({ user });
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = userValidation.updateUserSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }
    
            const user = await updateUser(id, value);
            return res.status(httpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    inactiveUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.inactiveUser(id);
            return res.status(httpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };
    
    activeUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.activeUser(id);
            return res.status(httpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };
    
    getListUsers = async (req, res, next) => {
        try {
            const pageIndex = parseInt(req.query.pageIndex) || config.DEFAULT_INDEX_PAGING;
            const pageSize = parseInt(req.query.pageSize) || config.DEFAULT_SIZE_PAGING;
            const users = await userService.getListUsers(pageIndex, pageSize);
            return res.status(httpStatus.OK).json(users);
        } catch (error) {
            next(error);
        }
    };

    getUserDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.getUserDetail(id);
            return res.status(httpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            return res.status(httpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new UserController();