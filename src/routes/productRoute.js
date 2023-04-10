const express = require( "express");
const productController = require('../controllers/productController');
const upload = require( "../middlewares/uploadMiddleware");

const productRouter = express.Router();

productRouter.post("/products", upload.single("file"), productController.createProduct);

productRouter.get("/products", productController.getListProducts);
productRouter.get("/products/:id", productController.getProducDetail);

productRouter.put("/products/:id", upload.single("file"), productController.updateProduct);

productRouter.delete("/products/:id/soft", productController.softDeleteProduct);
productRouter.delete("/products/:id/hard", productController.hardDeleteProduct);

module.exports = productRouter;