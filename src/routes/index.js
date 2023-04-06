const express= require('express');
const userRouter = require('./userRoutes')

const routers = express.Router();
routers.use(userRouter)

module.exports =  routers;