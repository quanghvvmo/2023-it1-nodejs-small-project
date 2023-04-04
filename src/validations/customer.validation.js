import Joi from "joi";

const createCustomerSchema = Joi.object({
    paymentMethod: Joi.number(),
    userId: Joi.number().required(),
});

const updateCustomerSchema = Joi.object({
    paymentMethod: Joi.number(),
});

export { createCustomerSchema, updateCustomerSchema };
