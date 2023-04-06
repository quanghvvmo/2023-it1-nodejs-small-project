import userService from "../services/userService"
import { validateUser } from "../validations/userValidation";

const createUser = async (req, res) => {
    try {
        let data = req.body;
        const { error, value } = validateUser.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await userService.createUser(value);
        if (result.errCode === 1) {
            return res.status(400).json(result);
        } else if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const page = req.query.page
        let result = await userService.getAllUsers(page);
        if (result.errCode === 0) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};
const getUserbyId = async (req, res) => {
    try {
        const userId = req.params.id;
        let result = await userService.getUserByid(userId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }

};
const activeUser = async (req, res) => {
    try {
        const userId = req.params.id
        let result = await userService.activeUser(userId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
};
const inactiveUser = async (req, res) => {
    try {
        const userId = req.params.id
        let result = await userService.inactiveUser(userId);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        let result = await userService.deleteUserById(userId);
        if (result.errCode === -1) {
            return res.status(404).json(result)
        } else return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }

};
const updateUser = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(400).json({
                errMsg: "Missing User id!"
            })
        }
        const { error, value } = validateUser.validate(data);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        let result = await userService.updateUser(value);
        if (result.errCode === -1) {
            return res.status(404).json(result);
        } else return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error);
    }
};



module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserbyId: getUserbyId,
    activeUser: activeUser,
    inactiveUser: inactiveUser,
    deleteUser: deleteUser,
    updateUser: updateUser,

}