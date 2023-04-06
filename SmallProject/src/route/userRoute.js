import userController from "../controller/userController"
import express from "express"

const userRoute = express.Router();

userRoute.post('/api/v1/user', userController.createUser)
userRoute.get('/api/v1/user', userController.getAllUsers)
userRoute.get('/api/v1/user/:id', userController.getUserbyId)
userRoute.put('/api/v1/user', userController.updateUser)
userRoute.delete('/api/v1/user/:id', userController.deleteUser)
userRoute.patch('/api/v1/user/:id/active', userController.activeUser)
userRoute.patch('/api/v1/user/:id/inactive', userController.inactiveUser)

module.exports = userRoute