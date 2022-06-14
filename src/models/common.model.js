const Joi = require('joi');

/**
 * @description Integer Schema
 */
const integerSchema = Joi.object({
    value: Joi.number().integer().min(1).required()
});
const validateInteger = data => integerSchema.validate(data);

/**
 * @description String Schema
 */
const stringSchema = Joi.object({
    value: Joi.string().required()
});
const validateString = data => stringSchema.validate(data);

/**
 * @description Exports
 */
exports.validateInteger = validateInteger;
exports.validateString = validateString;