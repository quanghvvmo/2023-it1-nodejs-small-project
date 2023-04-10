const Joi = require("joi");

const productValidation = {
    createProductSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        tax: Joi.number().required(),
        discount: Joi.number().required(),
    }),
    updateProductSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number(),
        tax: Joi.number(),
        discount: Joi.number(),
    })
};

module.exports = productValidation;

