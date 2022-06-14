const Joi = require('joi');

/**
 * @description Payment Transaction
 */
const paymentTransactionSchema = Joi.object({
    payment_id: Joi.number().required(),
    payment_reference: Joi.string().required(),
    payment_type: Joi.string().required(),
    payment_method: Joi.string().required(),
    payment_amount: Joi.number().required(),
    payment_change: Joi.number().required(),
    wallet_reference: Joi.string(),
    wallet_number: Joi.string(),
    wallet_name: Joi.string(),
    payment_status: Joi.string().required()
});
const validatePaymentTransaction = data => paymentTransactionSchema.validate(data);

/**
 * @description Exports
 */
exports.validatePaymentTransaction = validatePaymentTransaction;