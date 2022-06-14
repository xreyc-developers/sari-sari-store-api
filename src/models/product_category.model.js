const Joi = require('joi');

/**
 * @description Product Category
 */
const productCategorySchema = Joi.object({
    store_id: Joi.number().required(),
    name: Joi.string().required(),
    code: Joi.string().required()
});
const validateProductCategory = data => productCategorySchema.validate(data);

/**
 * @description Exports
 */
exports.validateProductCategory = validateProductCategory;