const Joi = require('joi');
const regex = require('../_utils/regex')

const UserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .pattern(regex.USERNAME_REGEX),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number()
        .integer()
        .min(1900)
        .required(),
    email: Joi.string()
        .pattern(regex.EMAIL_REGEX)
        .required(),
    phone: Joi.string()
        .min(10)
        .max(10)
})
module.exports = {Loginschema,UserSchema}