const Joi = require('joi');

/**
 * @description Payment
 */
const paymentSchema = Joi.object({
    order_id: Joi.number().required(),
    payment_modes: Joi.string().required(),
    total_amount_to_pay: Joi.number().required(),
    total_amount_received: Joi.number().required(),
    total_coupon_applied: Joi.number(),
    total_change_amount: Joi.number().required()
});
const validatePayment = data => paymentSchema.validate(data);

/**
 * @description Exports
 */
exports.validatePayment = validatePayment;