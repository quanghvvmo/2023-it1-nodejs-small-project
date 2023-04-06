const express = require('express');
const userMethod = require('../_service/user')
const userRouter = express.Router();
const authMiddleware = require('../middlewares/auth')

userRouter.post('/user/login',userMethod.login)
userRouter.get('/users/',authMiddleware,userMethod.getAllUsers)
userRouter.get('/user/:id',userMethod.getUserDetail)
userRouter.post('/users',userMethod.createUser)
userRouter.put('/user/:id',userMethod.updateUser)
userRouter.delete('user/:id',userMethod.deleteUser)
module.exports = userRouter;