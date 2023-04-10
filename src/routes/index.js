const express= require('express');
const userRouter = require('./userRoutes')
const customerRouter = require('./customerRoutes')
const orderRouter =  require('./orderRoutes')
const routers = express.Router();
routers.use(userRouter)
routers.use(customerRouter)
routers.use(orderRouter)
module.exports =  routers;