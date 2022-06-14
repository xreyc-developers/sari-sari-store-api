const Joi = require('joi');

/**
 * @description Order Products
 */
const orderProductSchema = Joi.object({
    order_id: Joi.number().required(),
    product_id: Joi.number().required(),
    product_name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    subtotal: Joi.number().required()
});
const validateOrderProduct = data => orderProductSchema.validate(data);

/**
 * @description Exports
 */
exports.validateOrderProduct = validateOrderProduct;