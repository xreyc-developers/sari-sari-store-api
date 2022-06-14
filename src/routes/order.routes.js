const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const orderWithProductsController = require('../controllers/order/order.controller');

// STORE
router.post('/', jwtAuthentication, orderWithProductsController.postOrderWithProductsController);
router.get('/', jwtAuthentication, orderWithProductsController.getOrdersWithProductsController);
// router.get('/:id', jwtAuthentication, storeController.getStoreByIdController);
router.put('/:id', jwtAuthentication, orderWithProductsController.updateOrderStatusByIdController);
router.delete('/:id', jwtAuthentication, orderWithProductsController.deleteOrderByIdController);

module.exports = router;