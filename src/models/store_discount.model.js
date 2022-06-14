const Joi = require('joi');

/**
 * @description Store Discount
 */
const storeDiscountSchema = Joi.object({
    store_id: Joi.number().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    discount_type: Joi.string().required()
});
const validateStoreDiscount = data => storeDiscountSchema.validate(data);

/**
 * @description Exports
 */
exports.validateStoreDiscount = validateStoreDiscount;