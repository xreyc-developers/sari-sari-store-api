// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const StoreDiscountsModel = require('../../models/store_discount.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const StoreDiscountsServices = require('../../services/StoreServices/store_discounts.services');
const StoreDiscountsInstance = new StoreDiscountsServices();

/**
 * @description POST
 */
exports.postStoreDiscountsController = async (req, res) => {
    try {
        const validatedData = StoreDiscountsModel.validateStoreDiscount(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await StoreDiscountsInstance.createStoreDiscount(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getStoreDiscountController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET STORES
        const response = await StoreDiscountsInstance.getStoreDiscounts(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getStoreDiscountsByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET PARAMS
        const storeDiscountId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreDiscountsInstance.getOwnerId(storeDiscountId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET
        const response = await StoreDiscountsInstance.getStoreDiscountById(storeDiscountId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateStoreDiscountsByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storeDiscountId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = StoreDiscountsModel.validateStoreDiscount(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreDiscountsInstance.getOwnerId(storeDiscountId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await StoreDiscountsInstance.updateStoreDiscountById(storeDiscountId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteStoreDiscountsByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storeDiscountId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreDiscountsInstance.getOwnerId(storeDiscountId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await StoreDiscountsInstance.deleteStoreDiscountById(storeDiscountId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}