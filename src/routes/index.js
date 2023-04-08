const express = require('express');
const userRouter = require("./userRoute");
const customerRouter = require('./customerRoute');

const routers = express.Router();

routers.use(userRouter);
routers.use(customerRouter);

module.exports = routers;