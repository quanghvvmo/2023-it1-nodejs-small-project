import Joi from "joi";

const validateCustomer = Joi.object({
    id: Joi.string(),
    userid: Joi.string().required(),
    paymentMethod: Joi.number().greater(0),
    isActive: Joi.boolean().required()
});

export { validateCustomer };