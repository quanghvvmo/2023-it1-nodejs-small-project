import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../models/index";
import jwt from "jsonwebtoken";
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const createUser = async (data) => {
    let newId = uuidv4();
    let existUser = await db.User.findOne({
        where: {
            username: data.username
        }
    })
    if (existUser) {
        return ({
            errCode: 1,
            errMsg: 'Username is already exsiting'
        })
    } else {
        let passwordHahsed = await hashUserPassword(data.password);
        const newUser = await db.User.create({
            id: newId,
            username: data.username,
            password: passwordHahsed,
            age: data.age,
            email: data.email,
            phone: data.phone,
            address: data.address,
            isActive: data.isActive,
            createBy: data.createBy,
            updateBy: data.updateBy
        })
        return ({
            newUser,
            errCode: 0,
            errMsg: 'The new User has been created'
        })
    }
}

const getAllUsers = async (page) => {
    let users = {}
    if (!page) {
        users = await db.User.findAll({
            include: [
                {
                    model: db.Customer
                }
            ],
            raw: false,
            nest: true
        });
    } else {
        const offset = (parseInt(page) - 1) * 5 // Set default 1 page has 5 users 
        users = await db.User.findAndCountAll({
            limit: 5,
            offset: offset,
            include: [
                {
                    model: db.Customer
                }
            ],
            raw: false,
            nest: true
        })
    }
    return ({
        users,
        errCode: 0,
        errMsg: 'Success',
    })
}
const getUserByid = async (userId) => {
    let user = await db.User.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: db.Customer
            }
        ],
        raw: true,
        nest: true
    })
    if (user) {
        return ({
            user,
            errCode: 0,
            errMsg: 'Ok',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found user'
    })
}
const activeUser = async (userId) => {
    let user = await db.User.findOne({
        where: {
            id: userId,
            isActive: false
        },
        raw: false
    })
    if (user) {
        user.isActive = 1;
        await user.save();
        return ({
            user,
            errCode: 0,
            errMsg: "Active successfully",
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found user or user is already actived!'
    })
}
const inactiveUser = async (userId) => {
    let user = await db.User.findOne({
        where: {
            id: userId,
            isActive: true
        },
        raw: false
    })
    if (user && user.length > 0) {
        user.isActive = 0;
        await user.save();
        return ({
            errCode: 0,
            errMsg: "Inactive successfully",
            user
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found user or user is already inactived!'
    })
}
const deleteUserById = async (userId) => {
    let user = await db.User.findOne({
        where: {
            id: userId
        },
        raw: false
    })
    if (user) {
        await user.destroy();
        let ownCustomer = await db.Customer.findOne({
            where: {
                userid: userId
            },
            raw: false
        })
        if (ownCustomer) {
            ownCustomer.userid = null;
            await ownCustomer.save();
        }
        return ({
            errCode: 0,
            errMsg: 'The user is deleted',
        })
    } else return ({
        errCode: -1,
        errMsg: 'Not found user'
    })
}
const updateUser = async (data) => {
    let usernameExist = await db.User.findOne({
        where: {
            username: data.username,
        },
        raw: false
    })
    if (!usernameExist) {
        let userUpdate = await db.User.findOne({
            where: {
                id: data.id,
            },
            raw: false
        })
        if (userUpdate) {
            let passwordHahsed = await hashUserPassword(data.password)
            userUpdate.username = data.username,
                userUpdate.password = passwordHahsed,
                userUpdate.age = data.age,
                userUpdate.email = data.email,
                userUpdate.phone = data.phone,
                userUpdate.address = data.address,
                userUpdate.isActive = data.isActive,
                userUpdate.createBy = data.createBy,
                userUpdate.updateBy = data.updateBy
            await userUpdate.save();
            return ({
                errCode: 0,
                errMsg: 'The user is updated'
            })
        } else {
            return ({
                errCode: 1,
                errMsg: 'Not found User!'
            })
        }
    } else return ({
        errCode: -1,
        errMsg: 'The username is already exsit, Please choose another nick name!'
    })
}
const handleLogin = async (data) => {
    let user = await db.User.findOne({
        where: {
            username: data.username
        }
    })
    if (user) {
        let check = await bcrypt.compareSync(data.password, user.password)
        if (check) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.SECRET_KEY
            )
            return ({
                user,
                token,
                errCode: 0,
                errMsg: 'Login successful!'
            })
        }
        return ({
            errCode: 1,
            errMsg: "Password is wrong!"
        })
    }
    return ({
        errCode: -1,
        errMsg: "Your email is not exsit!"
    })
}


module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserByid: getUserByid,
    activeUser: activeUser,
    inactiveUser: inactiveUser,
    deleteUserById: deleteUserById,
    updateUser: updateUser,
    handleLogin: handleLogin
}