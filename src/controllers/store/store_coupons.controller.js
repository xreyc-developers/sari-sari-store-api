// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const StoreCouponsModel = require('../../models/store_coupon.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const StoreCouponsServices = require('../../services/StoreServices/store_coupons.services');
const StoreCouponsInstance = new StoreCouponsServices();

/**
 * @description POST
 */
exports.postStoreCouponsController = async (req, res) => {
    try {
        const validatedData = StoreCouponsModel.validateStoreCoupon(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await StoreCouponsInstance.createStoreCoupon(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getStoreCouponController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET STORES
        const response = await StoreCouponsInstance.getStoreCoupons(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getStoreCouponsByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET PARAMS
        const storeCouponId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreCouponsInstance.getOwnerId(storeCouponId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET
        const response = await StoreCouponsInstance.getStoreCouponById(storeCouponId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateStoreCouponsByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storeCouponId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = StoreCouponsModel.validateStoreCoupon(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreCouponsInstance.getOwnerId(storeCouponId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await StoreCouponsInstance.updateStoreCouponById(storeCouponId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteStoreCouponsByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const storeCouponId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await StoreCouponsInstance.getOwnerId(storeCouponId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await StoreCouponsInstance.deleteStoreCouponById(storeCouponId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}