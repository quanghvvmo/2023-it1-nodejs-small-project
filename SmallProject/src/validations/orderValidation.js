import Joi from "joi";

const validateOrder = Joi.object({
    id: Joi.string(),
    customerid: Joi.string().required(),
    price: Joi.number().required().greater(0),
    tax: Joi.number().required().greater(0),
    discount: Joi.number().required().greater(0),
    totalPrice: Joi.number().required().greater(0),
    isDeleted: Joi.boolean().required()
});

const validateOrderDetail = Joi.object({
    id: Joi.string(),
    orderid: Joi.string().required(),
    productid: Joi.string().required(),
    price: Joi.number().required().greater(0),
    tax: Joi.number().required().greater(0),
    discount: Joi.number().required().greater(0),
    totalPrice: Joi.number().required().greater(0),
    isDeleted: Joi.boolean().required()
});


export { validateOrder, validateOrderDetail };