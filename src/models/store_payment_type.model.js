const Joi = require('joi');

/**
 * @description Store Payment Types
 */
const storePaymentTypesSchema = Joi.object({
    store_id: Joi.number().required(),
    is_cash: Joi.boolean().required(),
    is_vacash: Joi.boolean().required(),
    is_gcash: Joi.boolean().required(),
    is_paymaya: Joi.boolean().required(),
    currency: Joi.string().required()
});
const validateStorePaymentTypes = data => storePaymentTypesSchema.validate(data);

/**
 * @description Exports
 */
exports.validateStorePaymentTypes = validateStorePaymentTypes;