import productImgController from "../controller/productImgController"
import express from "express"
import authService from "../middlewares/auth"


const productImgRoute = express.Router();

productImgRoute.post('/api/v1/productimg', authService.authJWT, productImgController.createProductImg)
productImgRoute.get('/api/v1/productimg', authService.authJWT, productImgController.getListProductImg)
productImgRoute.get('/api/v1/productimg/:id', authService.authJWT, productImgController.getProductImgbyId)
productImgRoute.delete('/api/v1/productimg/:id', authService.authJWT, productImgController.hardDelete)
productImgRoute.patch('/api/v1/productimg/:id/delete', authService.authJWT, productImgController.softDelete)
productImgRoute.put('/api/v1/productimg', authService.authJWT, productImgController.updateProductImg)

module.exports = productImgRoute