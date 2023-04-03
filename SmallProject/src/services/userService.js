import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newId = uuidv4();
            let existUser = await db.User.findOne({
                where: {
                    username: data.username
                }
            })
            if (existUser) {
                resolve({
                    errCode: 1,
                    errMsg: 'Username is already exsiting'
                })
            } else {
                let passwordHahsed = await hashUserPassword(data.password);
                await db.User.create({
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
                resolve({
                    errCode: 0,
                    errMsg: 'The new User has been created'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (page) => {
    return new Promise(async (resolve, reject) => {
        console.log(page);
        try {
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
            resolve({
                errCode: 0,
                errMsg: 'Success',
                users
            })
        } catch (error) {
            reject(error);
        }
    })
}
let getUserByid = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                include: [
                    {
                        model: db.Customer
                    }
                ],
                raw: false,
                nest: true
            })
            if (user) {
                resolve({
                    errCode: 0,
                    errMsg: 'Ok',
                    user
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found user'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let activeUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                },
                raw: false
            })
            if (user) {
                if (user.isActive === true) {
                    resolve({
                        errCode: 2,
                        errMsg: 'The user is already Actived',
                    })
                } else {
                    user.isActive = 1;
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMsg: "Active successfully",
                        user
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found user'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let inactiveUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                },
                raw: false
            })
            if (user) {
                if (user.isActive === false) {
                    resolve({
                        errCode: 2,
                        errMsg: 'The user is already Inactived',
                    })
                } else {
                    user.isActive = 0;
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMsg: "Inactive successfully",
                        user
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'Not found user'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                });
                resolve({
                    errCode: 0,
                    errMsg: 'The user is deleted',
                })
            } else resolve({
                errCode: -1,
                errMsg: 'Not found user'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
                    resolve({
                        errCode: 0,
                        errMsg: 'The user is updated'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMsg: 'Not found User!'
                    })
                }
            } else resolve({
                errCode: -1,
                errMsg: 'The username is already exsit, Please choose another nick name!'
            })
        } catch (error) {
            reject(error);
        }
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
}