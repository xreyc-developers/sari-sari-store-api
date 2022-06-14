// UTILS
const UserResource = require('../../utils/user/user.resource');
// VALIDATION
const OrderTransactionModel = require('../../models/order_transaction.model');
const OrderStatusModel = require('../../models/order_status.model');
const CommonModel = require('../../models/common.model');
// SERVICES
const OrderWithProductTransactionServices = require('../../services/OrderServices/orders.process.services');
const OrderServices = require('../../services/OrderServices/orders.services');
const OrderWithProductTransactionInstance = new OrderWithProductTransactionServices();
const OrderServicesInstance = new OrderServices();

/**
 * @description POST
 */
exports.postOrderWithProductsController = async (req, res) => {
    try {
        const validatedData = OrderTransactionModel.validateOrderWithProducts(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });

        const response = await OrderWithProductTransactionInstance.createOrUpdateOrder(validatedData.value);
        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured '});
    }
}

/**
 * @description GET
 */
 exports.getOrdersWithProductsController = async (req, res) => {
    try {
        // GET ATHENTICATED USER ID
        const UserResourceInstance = new UserResource(res);
        const user_id = UserResourceInstance.getUserId();
        req.body['user_id'] = user_id;
        // GET
        const response = await OrderWithProductTransactionInstance.getOrdersWithProducts(req.body);
        res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' });
    }
}

/**
 * @description UPDATE
 */
 exports.updateOrderStatusByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const orderId = validatedParameters.value.value;
        // VALIDATE BODY
        const validatedData = OrderStatusModel.validateOrderStatus(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // GET RESOURCE OWNER
        const getResourceOwner = await OrderServicesInstance.getOwnerId(orderId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // UPDATE
        const response = await OrderWithProductTransactionInstance.updateOrderStatus(orderId, validatedData.value);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}

/**
 * @description DELETE
 */
 exports.deleteOrderByIdController = async (req, res) => {
    try {
        // VALIDATE PARAMETERS
        const validatedParameters = CommonModel.validateInteger({ value: req.params.id });
        if(validatedParameters.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        const orderId = validatedParameters.value.value;
        // GET RESOURCE OWNER
        const getResourceOwner = await OrderServicesInstance.getOwnerId(orderId);
        if(!getResourceOwner.data) return res.status(500).json({ status: 500, message: 'Bad request' })
        // CHECK IF USER OWNER
        const UserResourceInstance = new UserResource(res, getResourceOwner.data.user_id);
        if(!UserResourceInstance.isResourceOwner()) return res.status(500).json({ status: 500, message: 'Bad request' })
        // DELETE
        const response = await OrderWithProductTransactionInstance.deleteOrderById(orderId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: 'An error occured' })
    }
}