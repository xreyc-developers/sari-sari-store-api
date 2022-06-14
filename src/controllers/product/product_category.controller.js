// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const ProductCategoryModel = require('../../models/product_category.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const ProductCategoryServices = require('../../services/ProductServices/product_category.services');
const ProductCategoryInstance = new ProductCategoryServices();

/**
 * @description POST
 */
exports.postProductCategoryController = async (req, res) => {
    try {
        const validatedData = ProductCategoryModel.validateProductCategory(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await ProductCategoryInstance.createProductCategory(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getProductCategoryController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET
        const response = await ProductCategoryInstance.getProductCategories(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getProductCategoryByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET PARAMS
        const productCategoryId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductCategoryInstance.getOwnerId(productCategoryId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // GET
        const response = await ProductCategoryInstance.getProductCategoryById(productCategoryId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateProductCategoryByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const productCategoryId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = ProductCategoryModel.validateProductCategory(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductCategoryInstance.getOwnerId(productCategoryId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await ProductCategoryInstance.updateProductCategoryById(productCategoryId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteProductCategoryByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const productCategoryId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductCategoryInstance.getOwnerId(productCategoryId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await ProductCategoryInstance.deleteProductCategoryById(productCategoryId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}