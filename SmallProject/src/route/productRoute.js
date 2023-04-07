import productController from "../controller/productController"
import express from "express"
import uploadFile from '../middlewares/uploadFile'
import authService from "../middlewares/auth"

const productRoute = express.Router();

productRoute.post('/api/v1/product', authService.authJWT, uploadFile.upload.single('image'), productController.createProduct)
productRoute.get('/api/v1/product', authService.authJWT, productController.getListProduct)
productRoute.get('/api/v1/product/:id', authService.authJWT, productController.getProductbyId)
productRoute.delete('/api/v1/product/:id', authService.authJWT, productController.hardDeleteProduct)
productRoute.patch('/api/v1/product/:id/delete', authService.authJWT, productController.softDeleteProduct)
productRoute.put('/api/v1/product', authService.authJWT, productController.updateProduct)

module.exports = productRoute