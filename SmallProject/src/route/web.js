import express from "express";
import userController from "../controller/userController"
import customerController from "../controller/customerController"
import orderController from "../controller/orderController"
//import productController from "../controller/productController"

let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', (req, res) => {
        return res.send('Hello world');
    });
    //User Route
    router.post('/api/v1/user', userController.createUser)
    router.get('/api/v1/user', userController.getAllUsers)
    router.get('/api/v1/user/:id', userController.getUserbyId)
    router.put('/api/v1/user', userController.updateUser)
    router.delete('/api/v1/user/:id', userController.deleteUser)
    router.patch('/api/v1/user/:id/active', userController.activeUser)
    router.patch('/api/v1/user/:id/inactive', userController.inactiveUser)

    //Customer Route
    router.post('/api/v1/customer', customerController.createCustomer)
    router.get('/api/v1/customer', customerController.getAllCustomer)
    router.get('/api/v1/customer/:id', customerController.getCustomerbyId)
    router.put('/api/v1/customer', customerController.updateCustomer)
    router.delete('/api/v1/customer/:id', customerController.deleteCustomer)
    router.patch('/api/v1/customer/:id/active', customerController.activeCustomer)
    router.patch('/api/v1/customer/:id/inactive', customerController.inactiveCustomer)

    //Order Route
    router.post('/api/v1/order', orderController.createOrder)
    router.get('/api/v1/order', orderController.getAllOrder)
    router.get('/api/v1/order/:id', orderController.getOrderbyId)
    router.put('/api/v1/order', orderController.updateOrder)
    router.delete('/api/v1/order/:id', orderController.hardDeleteOrder)
    router.patch('/api/v1/order/:id/delete', orderController.softDeleteOrder)

    /*
    
    
    
    
    
    

    router.post('/api/v1/product', productController.createProduct)
    router.get('/api/v1/product', productController.getListProduct)
    */

    return app.use("/", router);
}
module.exports = initWebRoute;