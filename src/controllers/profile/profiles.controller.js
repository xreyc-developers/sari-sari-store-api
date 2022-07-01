// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const ProfileModel = require('../../models/profile.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const ProfileServices = require('../../services/ProfileServices/profile.services');
const ProfileServicesServiceInstance = new ProfileServices();


/**
 * @description GET BY ID
 */
exports.getProfileByIdController = async (req, res) => {
    try {
        // CHECK IF USER OWNER
        const response = await ProfileServicesServiceInstance.getProfileById(res.locals.user.user_id);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateProfileByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // VALIDATE BODY
        const validatedData = ProfileModel.validateProfile(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET PROFILE BY ID
        const profileId = validatedParameters.value.value;
        const profileToUpdate = await ProfileServicesServiceInstance.getProfileById(profileId);
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, profileToUpdate.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE PROFILE
        const response = await ProfileServicesServiceInstance.updateUserById(profileId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteProfileByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET PROFILE BY ID
        const profileId = validatedParameters.value.value;
        const profileToUpdate = await ProfileServicesServiceInstance.getProfileById(profileId);
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, profileToUpdate.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE PROFILE
        const response = await ProfileServicesServiceInstance.deleteUserById(profileId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}