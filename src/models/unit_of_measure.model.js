const Joi = require('joi');

/**
 * @description Unit Of Measure
 */
const unitOfMeasureSchema = Joi.object({
    store_id: Joi.number().required(),
    name: Joi.string().required(),
    unit: Joi.string().required()
});
const validateUnitOfMeasure = data => unitOfMeasureSchema.validate(data);

/**
 * @description Exports
 */
exports.validateUnitOfMeasure = validateUnitOfMeasure;