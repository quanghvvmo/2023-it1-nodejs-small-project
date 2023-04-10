import userController from "../controller/userController"
import express from "express"
import authService from "../middlewares/auth"

const userRoute = express.Router();

userRoute.post('/api/v1/user', authService.authJWT, userController.createUser)
userRoute.get('/api/v1/user', authService.authJWT, userController.getAllUsers)
userRoute.get('/api/v1/user/:id', authService.authJWT, userController.getUserbyId)
userRoute.put('/api/v1/user', authService.authJWT, userController.updateUser)
userRoute.delete('/api/v1/user/:id', authService.authJWT, userController.deleteUser)
userRoute.patch('/api/v1/user/:id/active', authService.authJWT, userController.activeUser)
userRoute.patch('/api/v1/user/:id/inactive', authService.authJWT, userController.inactiveUser)
userRoute.post('/api/v1/user/login', userController.handleLogin)

module.exports = userRoute