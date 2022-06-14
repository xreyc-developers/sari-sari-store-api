// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const StoreModel = require('../../models/store.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const StoreServices = require('../../services/StoreServices/stores.services');
const StoreServiceInstance = new StoreServices();

/**
 * @description POST
 */
exports.postStoreController = async (req, res) => {
    try {
        const validatedData = StoreModel.validateStore(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET AUTHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        // CREATE STORE
        const storeToCreate = validatedData.value;
        storeToCreate['user_id'] = user_id;
        const response = await StoreServiceInstance.createStore(storeToCreate);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
exports.getStoreController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET STORES
        const response = await StoreServiceInstance.getStore(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getStoreByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET STORE
        const storeId = validatedParameters.value.value;
        const response = await StoreServiceInstance.getStoreById(storeId);
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, response.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateStoreByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // VALIDATE BODY
        const validatedData = StoreModel.validateStore(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET STORE BY ID
        const storeId = validatedParameters.value.value;
        const storeToUpdate = await StoreServiceInstance.getStoreById(storeId);
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, storeToUpdate.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE STORE
        const response = await StoreServiceInstance.updateStoreById(storeId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteStoreByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET STORE BY ID
        const storeId = validatedParameters.value.value;
        const storeToUpdate = await StoreServiceInstance.getStoreById(storeId);
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, storeToUpdate.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE STORE
        const response = await StoreServiceInstance.deleteStoreById(storeId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}