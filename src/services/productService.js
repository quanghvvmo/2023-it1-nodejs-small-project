const httpStatus = require("http-status");
const sequelize = require('../models/dbconfig.js')
const APIError = require('../helper/apiError');
const { ApiResponse, ApiPagingResponse } = require('../helper/apiResponse');
const { Product, ProductImages } = sequelize.models;
const productMessage = require('../constants/productMessage');

class ProductService {
    createProduct = async (data) => {
        let product;
        const { name } = data;
        const transaction = await sequelize.transaction();
        try {
            product = await Product.create(data, { transaction });
            const ProductId = product.id;
            await ProductImages.create(
                {
                    ...data,
                    ProductId,
                    url: `${config.product_images_url}/${name}`,
                },
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new APIError({
                message: productMessage.ERROR_TRANSACTION,
                status: httpStatus.INTERNAL_SERVER_ERROR
            })
        }

        return new ApiResponse(product, httpStatus.CREATED, productMessage.PRODUCT_CREATED);
    }

    getListProducts = async(pageIndex, pageSize) => {
        const products = await Product.findAll();

        const numOfProducts = products.length;
        if(!numOfProducts) {
            throw new APIError({ message: productMessage.PRODUCT_NOT_FOUND, status: httpStatus.BAD_REQUEST });
        }

        const totalPages = parseInt((numOfOrders + pageSize - 1) / pageSize);
        if (pageIndex > totalPage) {
            throw new APIError({ message: productMessage.INVALID_PAGGING, status: httpStatus.BAD_REQUEST });
        }
    
        const start = (pageIndex - 1) * pageSize;
        const end = start + pageSize;

        return new ApiPagingResponse(
            products.slice(start, end),
            pageIndex,
            pageSize,
            numOfProducts,
            totalPages
        );
    }

    getProductDetail = async (id) => {
        const product = await Product.findOne({
            include: [ProductImages],
            where: { id },
        });
    
        if (!product) {
            throw new APIError({ message: productMessage.PRODUCT_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
        return product;
    }

    updateProduct = async (id, data) => {
        let product;
        const transaction = await sequelize.transaction();
        try {
            product = await Product.update(
                data,
                { where: { id } },
                { transaction }
            );
            const ProductId = product.id
    
            await ProductImages.update(
                data,
                { where: { ProductId } },
                { transaction }
            );
    
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new APIError({
                message: productMessage.ERROR_TRANSACTION,
                status: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
        return new ApiResponse(product, httpStatus.OK, productMessage.PRODUCT_UPDATED);
    };

    softDeleteProduct = async (id) => {
        const product = await Product.update({ isDeleted: true }, { where: { id } });
        if (!product) {
            throw new APIError({ message: productMessage.PRODUCT_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
        return new ApiResponse(product, httpStatus.OK, productMessage.PRODUCT_SOFT_DELETED);
    };
    
    hardDeleteProduct = async (id) => {
        const product = await Product.destroy({ where: { id } });
        if (!product) {
            throw new APIError({ message: productMessage.PRODUCT_NOT_FOUND, status: httpStatus.NOT_FOUND });
        }
        return new ApiResponse(product, httpStatus.OK, productMessage.PRODUCT_HARD_DELETED);
    };
}

module.exports = new ProductService();