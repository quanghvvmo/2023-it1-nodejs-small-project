const Joi = require('joi');

const orderValidation = {
    createOrderSchema: Joi.object({
        price: Joi.number().required(),
        tax: Joi.number().required(),
        discount: Joi.number().required(),
        ProductId: Joi.string().required()
    }),
    
    updateOrderSchema: Joi.object({
        price: Joi.number(),
        tax: Joi.number(),
        discount: Joi.number(),
    })
}

module.exports = orderValidation;