const Joi = require('joi');

/**
 * @description Order
 */
const orderSchema = Joi.object({
    store_id: Joi.number().required(),
    receipt_number: Joi.string().required(),
    grand_total: Joi.number().required(),
    customer_name: Joi.string(),
    customer_number: Joi.string(),
    customer_address: Joi.string(),
    notes: Joi.string(),
    coupon: Joi.string(),
    order_status: Joi.string().required()
});
const validateOrder = data => orderSchema.validate(data);

/**
 * @description Exports
 */
exports.validateOrder = validateOrder;