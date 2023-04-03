import Joi from "joi";
import { USERNAME_REGEX, EMAIL_REGEX } from "../_utils/regex_validation.js";

const createSchema = Joi.object({
    username: Joi.string().required().pattern(USERNAME_REGEX),
    email: Joi.string().email().pattern(EMAIL_REGEX),
    password: Joi.string().required(),
    age: Joi.number(),
    phone: Joi.string(),
    address: Joi.string(),
});

export { createSchema };
