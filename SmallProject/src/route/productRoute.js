import productController from "../controller/productController"
import express from "express"
import uploadFile from '../middlewares/uploadFile'

const productRoute = express.Router();

productRoute.post('/api/v1/product', uploadFile.upload.single('image'), productController.createProduct)
productRoute.get('/api/v1/product', productController.getListProduct)
productRoute.get('/api/v1/product/:id', productController.getProductbyId)
productRoute.delete('/api/v1/product/:id', productController.hardDeleteProduct)
productRoute.patch('/api/v1/product/:id/delete', productController.softDeleteProduct)
productRoute.put('/api/v1/product', productController.updateProduct)

module.exports = productRoute