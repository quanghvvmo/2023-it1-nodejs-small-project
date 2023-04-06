import Joi from "joi";
import { USERNAME_REGEX, EMAIL_REGEX } from "../_ultis/index";

const validateUser = Joi.object({
    id: Joi.string(),
    username: Joi.string().required().pattern(USERNAME_REGEX),
    email: Joi.string().email().pattern(EMAIL_REGEX),
    password: Joi.string().required(),
    age: Joi.number().required().greater(0),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    isActive: Joi.boolean().required()
});


export { validateUser };