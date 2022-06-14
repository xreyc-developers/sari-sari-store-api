// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const ProductModel = require('../../models/product.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const ProductServices = require('../../services/ProductServices/products.services');
const ProductInstance = new ProductServices();

/**
 * @description POST
 */
exports.postProductController = async (req, res) => {
    try {
        const validatedData = ProductModel.validateProduct(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE
        const response = await ProductInstance.createProduct(validatedData.value);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getProductController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET
        const response = await ProductInstance.getProducts(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description GET BY ID
 */
exports.getProductByIdController = async (req, res) => {
    try {
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET PARAMS
        const productId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductInstance.getOwnerId(productId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET
        const response = await ProductInstance.getProductById(productId);
        // RETURN REQUEST
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
exports.updateProductByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const productId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = ProductModel.validateProduct(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductInstance.getOwnerId(productId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await ProductInstance.updateProductById(productId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
exports.deleteProductByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const productId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await ProductInstance.getOwnerId(productId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await ProductInstance.deleteProductById(productId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}