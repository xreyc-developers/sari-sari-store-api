const Joi = require('joi');

/**
 * @description Signup Validation
 */
const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' ]}}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: Joi.ref('password'),
    birthdate: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    phone: Joi.string()
});
const validateRegister = data => signupSchema.validate(data);

/**
 * @description Login Validation
 */
const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
const validateLogin = data => loginSchema.validate(data);

/**
 * @description Exports
 */
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;