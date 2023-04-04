import {
    addUser,
    getUserDetail,
    getListUsers,
    updateUser,
    activeUser,
    inactiveUser,
    hardDeleteUser,
} from "../services/user.service.js";
import httpStatus from "http-status";
import { createUserSchema, updateUserSchema } from "../validations/user.validation.js";

const addUserController = async (req, res, next) => {
    try {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const createdUserId = await addUser(value);
        return res.status(httpStatus.CREATED).json(createdUserId);
    } catch (error) {
        next(error);
    }
};

const updateUserController = async (req, res, next) => {
    try {
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const updatedUserId = await updateUser(req.params.id, value);
        return res.status(httpStatus.OK).json(updatedUserId);
    } catch (error) {
        next(error);
    }
};

const getUserDetailController = async (req, res, next) => {
    try {
        const user = await getUserDetail(req.params.id);
        return res.status(httpStatus.OK).json(user);
    } catch (error) {
        next(error);
    }
};

const getListUsersController = async (req, res, next) => {
    try {
        const index = parseInt(req.query.index);
        const size = parseInt(req.query.size);
        if (isNaN(index) || isNaN(size) || index <= 0 || size <= 0) {
            return res.status(httpStatus.BAD_REQUEST).json("index or size is invalid");
        }

        const users = await getListUsers(index, size);
        return res.status(httpStatus.OK).json(users);
    } catch (error) {
        next(error);
    }
};

const activeUserController = async (req, res, next) => {
    try {
        const userId = await activeUser(req.params.id);
        return res.status(httpStatus.OK).json(userId);
    } catch (error) {
        next(error);
    }
};

const inactiveUserController = async (req, res, next) => {
    try {
        const userId = await inactiveUser(req.params.id);
        return res.status(httpStatus.OK).json(userId);
    } catch (error) {
        next(error);
    }
};

const hardDeleteUserController = async (req, res, next) => {
    try {
        const userId = await hardDeleteUser(req.params.id);
        return res.status(httpStatus.OK).json(userId);
    } catch (error) {
        next(error);
    }
};

export {
    addUserController,
    getUserDetailController,
    getListUsersController,
    updateUserController,
    activeUserController,
    inactiveUserController,
    hardDeleteUserController,
};
