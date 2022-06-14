const Joi = require('joi');

/**
 * @description Order Status
 */
const orderStatusSchema = Joi.object({
    order_status: Joi.string().valid('On Cart', 'Placed', 'For Payment', 'Paid').required(),
});
const validateOrderStatus = data => orderStatusSchema.validate(data);

/**
 * @description Exports
 */
exports.validateOrderStatus = validateOrderStatus;