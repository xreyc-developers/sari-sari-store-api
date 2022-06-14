const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const storePaymentTypeController = require('../controllers/store/store_payment_types.controller');

// STORE PAYMENT TYPES
router.post('/', jwtAuthentication, storePaymentTypeController.postStorePaymentTypesController);
router.get('/:id', jwtAuthentication, storePaymentTypeController.getStorePaymentTypesByIdController);
router.put('/:id', jwtAuthentication, storePaymentTypeController.updateStorePaymentTypesByIdController);
router.delete('/:id', jwtAuthentication, storePaymentTypeController.deleteStorePaymentTypesByIdController);

module.exports = router;