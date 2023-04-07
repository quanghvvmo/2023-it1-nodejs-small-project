import Joi from "joi";

const createOrderSchema = Joi.object({
    price: Joi.number().required(),
    tax: Joi.number().required(),
    discount: Joi.number().required(),
    ProductId: Joi.number().required(),
});

const updateOrderSchema = Joi.object({
    price: Joi.number(),
    tax: Joi.number(),
    discount: Joi.number(),
});

export { createOrderSchema, updateOrderSchema };
