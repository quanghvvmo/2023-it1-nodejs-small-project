const productService = require('../services/productService');
const httpStatus = require('http-status');
const productValidation = require('../validations/productValidation');
const config = require('../config/index');

class ProductController {
    createProduct = async (req, res, next) => {
        try {
            const { error, value } = productValidation.createProductSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
            }

            const product = await productService.createProduct(value);
            return res.status(httpStatus.CREATED).json(product);
        } catch (error) {
            next(error)
        }
    }

    getListProducts = async (req, res, next) => {
        try {
            const pageIndex = parseInt(req.query.pageIndex) || config.default_index_paging;
            const pageSize = parseInt(req.query.pageSize) || config.default_size_paging;
            const products = await productService.getListProducts(pageIndex, pageSize);
            return res.status(httpStatus.OK).json(products);
        } catch (error) {
            next(error);
        }
    };

    getProducDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService.getProductDetail(id);
            return res.status(httpStatus.OK).json(product);
        } catch (error) {
            next(error);
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const { error, value } = productValidation.updateProductSchema.validate(req.body);
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
            }
    
            const product = await productService.updateProduct(req.params.id, value);
            return res.status(httpStatus.OK).json(product);
        } catch (error) {
            next(error);
        }
    };

    hardDeleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await hardDeleteProduct(id);
            return res.status(httpStatus.OK).json(product);
        } catch (error) {
            next(error);
        }
    };
    
    softDeleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await softDeleteProduct(id);
            return res.status(httpStatus.OK).json(product);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ProductController();