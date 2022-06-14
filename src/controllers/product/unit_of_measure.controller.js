// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const UnitOfMeasureModel = require('../../models/unit_of_measure.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const UnitOfMeasureServices = require('../../services/ProductServices/unit_of_measure.services');
const UnitOfMeasureInstance = new UnitOfMeasureServices();

/**
 * @description POST
 */
exports.postUnitOfMeasureController = async (req, res) => {
    try {
        const validatedData = UnitOfMeasureModel.validateUnitOfMeasure(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await UnitOfMeasureInstance.createUnitOfMeasure(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getUnitOfMeasureController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET
        const response = await UnitOfMeasureInstance.getUnitOfMeasures(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getUnitOfMeasureByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET PARAMS
        const unitOfMeasureId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await UnitOfMeasureInstance.getOwnerId(unitOfMeasureId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET
        const response = await UnitOfMeasureInstance.getUnitOfMeasureById(unitOfMeasureId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateUnitOfMeasureByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const unitOfMeasureId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = UnitOfMeasureModel.validateUnitOfMeasure(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await UnitOfMeasureInstance.getOwnerId(unitOfMeasureId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await UnitOfMeasureInstance.updateUnitOfMeasureById(unitOfMeasureId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteUnitOfMeasureByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const unitOfMeasureId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await UnitOfMeasureInstance.getOwnerId(unitOfMeasureId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await UnitOfMeasureInstance.deleteUnitOfMeasureById(unitOfMeasureId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}