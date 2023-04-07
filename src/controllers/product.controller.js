import httpStatus from "http-status";
import {
    addProduct,
    updateProduct,
    getProductDetail,
    getListProducts,
    softDeleteProduct,
    hardDeleteProduct,
} from "../services/product.service.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js";
import config from "../config/index.js";

const createProductController = async (req, res, next) => {
    try {
        const { error, value } = createProductSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const createdProductId = await addProduct(value);
        return res.status(httpStatus.CREATED).json(createdProductId);
    } catch (error) {
        next(error);
    }
};

const getProductController = async (req, res, next) => {
    try {
        const Product = await getProductDetail(req.params.id);
        return res.status(httpStatus.OK).json(Product);
    } catch (error) {
        next(error);
    }
};

const getProductsController = async (req, res, next) => {
    try {
        let pageIndex = parseInt(req.query.pageIndex);
        let pageSize = parseInt(req.query.pageSize);
        if (isNaN(pageIndex) || isNaN(pageSize) || pageIndex <= 0 || pageSize <= 0) {
            pageIndex = config.default_index_pagination;
            pageSize = config.default_size_pagination;
        }

        const Products = await getListProducts(pageIndex, pageSize);
        return res.status(httpStatus.OK).json(Products);
    } catch (error) {
        next(error);
    }
};

const updateProductController = async (req, res, next) => {
    try {
        const { error, value } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
        }

        const updatedProduct = await updateProduct(req.params.id, value);
        return res.status(httpStatus.OK).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

const hardDeleteProductController = async (req, res, next) => {
    try {
        const Product = await hardDeleteProduct(req.params.id);
        return res.status(httpStatus.OK).json(Product);
    } catch (error) {
        next(error);
    }
};

const softDeleteProductController = async (req, res, next) => {
    try {
        const Product = await softDeleteProduct(req.params.id);
        return res.status(httpStatus.OK).json(Product);
    } catch (error) {
        next(error);
    }
};

export {
    createProductController,
    getProductController,
    getProductsController,
    updateProductController,
    hardDeleteProductController,
    softDeleteProductController,
};
