const Joi = require('joi');

/**
 * @description Profile Validation
 */
const profileSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' ]}}).required(),
    birthdate: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    phone: Joi.string()
});
const validateProfile = data => profileSchema.validate(data);

/**
 * @description Exports
 */
exports.validateProfile = validateProfile;