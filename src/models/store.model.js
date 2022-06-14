const Joi = require('joi');

/**
 * @description Store
 */
const storeSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string(),
    open_time: Joi.date(),
    close_time: Joi.date(),
    address1: Joi.string(),
    address2: Joi.string(),
    address3: Joi.string(),
    address4: Joi.string(),
    address5: Joi.string(),
    store_logo_url: Joi.string()
});
const validateStore = data => storeSchema.validate(data);

/**
 * @description Exports
 */
exports.validateStore = validateStore;