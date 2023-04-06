import Joi from "joi";

const validateProduct = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().greater(0),
    tax: Joi.number().greater(0),
    discount: Joi.number().greater(0),
    totalPrice: Joi.number().greater(0),
    isDeleted: Joi.boolean(),
});

const validateProductimage = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    productid: Joi.string().required(),
    url: Joi.string().required(),
    isDeleted: Joi.boolean(),
});


export { validateProduct, validateProductimage };