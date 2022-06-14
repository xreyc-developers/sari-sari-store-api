// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const StorePaymentTypesModel = require('../../models/store_payment_type.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const StorePaymentTypesServices = require('../../services/StoreServices/store_payment_types.services');
const StorePaymentTypesInstance = new StorePaymentTypesServices();

/**
 * @description POST
 */
exports.postStorePaymentTypesController = async (req, res) => {
    try {
        const validatedData = StorePaymentTypesModel.validateStorePaymentTypes(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await StorePaymentTypesInstance.createStorePaymentType(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
exports.getStorePaymentTypesByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET PARAMS
        const storePaymentTypeId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StorePaymentTypesInstance.getOwnerId(storePaymentTypeId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET
        const response = await StorePaymentTypesInstance.getStorePaymentTypeById(storePaymentTypeId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateStorePaymentTypesByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storePaymentTypeId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = StorePaymentTypesModel.validateStorePaymentTypes(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await StorePaymentTypesInstance.getOwnerId(storePaymentTypeId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await StorePaymentTypesInstance.updateStorePaymentTypeById(storePaymentTypeId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteStorePaymentTypesByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storePaymentTypeId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StorePaymentTypesInstance.getOwnerId(storePaymentTypeId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await StorePaymentTypesInstance.deleteStorePaymentTypeById(storePaymentTypeId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}