import Joi from "joi";

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number(),
    tax: Joi.number(),
    discount: Joi.number(),
});

const updateProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number(),
    tax: Joi.number(),
    discount: Joi.number(),
});

export { createProductSchema, updateProductSchema };
