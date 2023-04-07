import APIError from "../helper/apiError.js";
import httpStatus from "http-status";
import sequelize from "../models/index.js";
import { ApiDataResponse, ApiPaginatedResponse } from "../helper/apiResponse.js";
import config from "../config/index.js";

const { Product, ProductImages } = sequelize.models;

const addProduct = async (payload) => {
    const t = await sequelize.transaction();

    let newProduct;

    try {
        newProduct = await Product.create(payload, { transaction: t });

        await ProductImages.create(
            {
                ...payload,
                ProductId: newProduct.id,
                url: `${config.produce_images_url}/${payload.name}`,
            },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new APIError({
            message: "Transaction got error !",
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    return new ApiDataResponse(httpStatus.CREATED, "create success", newProduct);
};

const updateProduct = async (productId, payload) => {
    const t = await sequelize.transaction();

    let updatedProduct;

    try {
        updatedProduct = await Product.update(
            payload,
            { where: { id: productId } },
            { transaction: t }
        );

        await ProductImages.update(
            payload,
            { where: { ProductId: productId } },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new APIError({
            message: "Transaction got error !",
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    return new ApiDataResponse(httpStatus.OK, "update success", updatedProduct);
};

const getProductDetail = async (productId) => {
    const product = await Product.findOne({
        include: [ProductImages],
        where: { id: productId },
    });

    if (!product) {
        throw new APIError({ message: "Product not found !", status: httpStatus.NOT_FOUND });
    }

    return product;
};

const getListProducts = async (pageIndex, pageSize) => {
    const products = await Product.findAll();

    const totalCount = products.length;
    if (!totalCount) {
        throw new APIError({ message: "Products not found !", status: httpStatus.NOT_FOUND });
    }

    const totalPages = Math.ceil(totalCount / pageSize);
    if (pageIndex > totalPages) {
        throw new APIError({ message: "Invalid page index", status: httpStatus.BAD_REQUEST });
    }

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return new ApiPaginatedResponse(
        pageIndex,
        pageSize,
        totalCount,
        totalPages,
        products.slice(startIndex, endIndex)
    );
};

const softDeleteProduct = async (productId) => {
    const deletedProduct = await Product.update({ isDeleted: true }, { where: { id: productId } });
    if (!deletedProduct) {
        throw new APIError({ message: "Product not found", status: httpStatus.NOT_FOUND });
    }

    return new ApiDataResponse(httpStatus.OK, "soft delete success", deletedProduct);
};

const hardDeleteProduct = async (productId) => {
    const deletedProduct = await Product.destroy({ where: { id: productId } });
    if (!deletedProduct) {
        throw new APIError({ message: "Product not found", status: httpStatus.NOT_FOUND });
    }

    return new ApiDataResponse(httpStatus.OK, "hard delete success", deletedProduct);
};

export {
    addProduct,
    updateProduct,
    getProductDetail,
    getListProducts,
    softDeleteProduct,
    hardDeleteProduct,
};
