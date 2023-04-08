const Joi = require('joi');

const customerValidation = {
    createCustomerSchema: Joi.object({
        paymentMethod: Joi.number(),
        UserId: Joi.string().required(),
    }),
    
    updateCustomerSchema: Joi.object({
        paymentMethod: Joi.number(),
    })
}

module.exports = customerValidation;