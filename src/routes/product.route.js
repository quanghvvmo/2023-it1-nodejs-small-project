import express from "express";
import {
    createProductController,
    getProductController,
    getProductsController,
    updateProductController,
    hardDeleteProductController,
    softDeleteProductController,
} from "../controllers/product.controller.js";
import upload from "../middlewares/uploadFile.middleware.js";

const productRouter = express.Router();

productRouter.post("/products", upload.single("file"), createProductController);

productRouter.get("/products", getProductsController);
productRouter.get("/products/:id", getProductController);

productRouter.put("/products/:id", upload.single("file"), updateProductController);

productRouter.delete("/products/:id/soft", softDeleteProductController);
productRouter.delete("/products/:id/hard", hardDeleteProductController);

export default productRouter;
