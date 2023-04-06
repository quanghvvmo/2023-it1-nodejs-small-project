import productImgController from "../controller/productImgController"
import express from "express"


const productImgRoute = express.Router();

productImgRoute.post('/api/v1/productimg', productImgController.createProductImg)
productImgRoute.get('/api/v1/productimg', productImgController.getListProductImg)
productImgRoute.get('/api/v1/productimg/:id', productImgController.getProductImgbyId)
productImgRoute.delete('/api/v1/productimg/:id', productImgController.hardDelete)
productImgRoute.patch('/api/v1/productimg/:id/delete', productImgController.softDelete)
productImgRoute.put('/api/v1/productimg', productImgController.updateProductImg)

module.exports = productImgRoute