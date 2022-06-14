const Joi = require('joi');

/**
 * @description Store Coupon
 */
const storeCouponSchema = Joi.object({
    store_id: Joi.number().required(),
    code: Joi.string().required(),
    amount: Joi.number().required()
});
const validateStoreCoupon = data => storeCouponSchema.validate(data);

/**
 * @description Exports
 */
exports.validateStoreCoupon = validateStoreCoupon;