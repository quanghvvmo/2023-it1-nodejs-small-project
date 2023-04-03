import userService from "../services/userService"

let checkInput = (inputData) => {
    let arr = [
        "username",
        "password",
        "age",
        "email",
        "isActive"
    ];
    let isValid = true;
    let element = "";
    for (let i = 0; i < arr.length; i++) {
        if (!inputData[arr[i]]) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element,
    };
};
let checkvalidEmail = (inputEmail) => {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputEmail.match(mailFormat)) {
        return false;
    } else return true;
};
let createUser = async (req, res) => {
    let data = req.body;
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let checkMail = checkvalidEmail(data.email);
    if (checkMail === false) {
        return res.status(400).json({
            errMsg: "You have entered an invalid email address!"
        })
    }
    let result = await userService.createUser(data);
    if (result.errCode === 1) {
        return res.status(400).json(result.errMsg);
    } else if (result.errCode === 0) {
        return res.status(200).json(result.errMsg);
    }
};

let getAllUsers = async (req, res) => {
    let page = req.query.page
    let result = await userService.getAllUsers(page);
    if (result.errCode === 0) {
        return res.status(200).json(result.users);
    }
};
let getUserbyId = async (req, res) => {
    let userId = req.params.id;
    let result = await userService.getUserByid(userId);
    if (result.errCode === -1) {
        return res.status(404).json(result.errMsg);
    } else return res.status(200).json(result.user)
};
let activeUser = async (req, res) => {
    let userId = req.params.id
    let result = await userService.activeUser(userId);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else if (result.errCode === 2) {
        return res.status(201).json(result);
    } else return res.status(200).json(result)
};
let inactiveUser = async (req, res) => {
    let userId = req.params.id
    let result = await userService.inactiveUser(userId);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else if (result.errCode === 2) {
        return res.status(201).json(result);
    } else return res.status(200).json(result)
};
let deleteUser = async (req, res) => {
    let userId = req.params.id
    let result = await userService.deleteUserById(userId);
    if (result.errCode === -1) {
        return res.status(404).json(result)
    } else return res.status(200).json(result);
};
let updateUser = async (req, res) => {
    let data = req.body;
    if (!data.id) {
        return res.status(400).json({
            errMsg: "Missing User id!"
        })
    }
    let check = checkInput(data);
    if (check.isValid === false) {
        return res.status(400).json({
            errMsg: `Please input: ${check.element}`
        })
    }
    let checkMail = checkvalidEmail(data.email);
    if (checkMail === false) {
        return res.status(400).json({
            errMsg: "You have entered an invalid email address!"
        })
    }
    let result = await userService.updateUser(data);
    if (result.errCode === -1) {
        return res.status(404).json(result);
    } else return res.status(200).json(result)
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