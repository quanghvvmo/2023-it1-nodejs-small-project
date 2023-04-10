const regex = require('../_utils/regex')
const Joi = require('joi');
const orderSchema = Joi.object({
    customerId: Joi.number()
        .min(1)
        .required()
})
module.exports = {orderSchema}