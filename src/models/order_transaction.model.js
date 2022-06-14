const Joi = require('joi');

/**
 * @description Order Products
 */

 const orderProductItemSchema = Joi.object().keys({
    order_product_id: Joi.number().default(0),
    order_id: Joi.number().default(0),
    product_id: Joi.number().required(),
    product_name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    subtotal: Joi.number().required()
});

 const orderWithProductsSchema = Joi.object({
    order_id: Joi.number().default(0),
    store_id: Joi.number().required(),
    receipt_number: Joi.string().required(),
    grand_total: Joi.number().required(),
    customer_name: Joi.string(),
    customer_number: Joi.string(),
    customer_address: Joi.string(),
    notes: Joi.string(),
    coupon: Joi.string(),
    order_status: Joi.string().valid('On Cart', 'Placed', 'For Payment', 'Paid').required(),
    productItems: Joi.array().items(orderProductItemSchema)
});

const validateOrderWithProducts = data => orderWithProductsSchema.validate(data);

/**
 * @description Exports
 */
exports.validateOrderWithProducts = validateOrderWithProducts;