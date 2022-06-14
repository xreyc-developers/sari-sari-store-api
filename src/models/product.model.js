const Joi = require('joi');

/**
 * @description Product
 */
const productSchema = Joi.object({
    store_id: Joi.number().required(),
    product_category_id: Joi.number(),
    name: Joi.string().required(),
    product_code: Joi.string().required(),
    uom_id: Joi.number().required(),
    price: Joi.number().required(),
    cost: Joi.number().required(),
    stocks: Joi.number().required(),
    low_stock_level: Joi.number().required()
});
const validateProduct = data => productSchema.validate(data);

/**
 * @description Exports
 */
exports.validateProduct = validateProduct;