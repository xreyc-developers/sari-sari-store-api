const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const storeDiscountController = require('../controllers/store/store_discounts.controller');

// STORE DISCOUNTS
router.post('/', jwtAuthentication, storeDiscountController.postStoreDiscountsController);
router.get('/', jwtAuthentication, storeDiscountController.getStoreDiscountController);
router.get('/:id', jwtAuthentication, storeDiscountController.getStoreDiscountsByIdController);
router.put('/:id', jwtAuthentication, storeDiscountController.updateStoreDiscountsByIdController);
router.delete('/:id', jwtAuthentication, storeDiscountController.deleteStoreDiscountsByIdController);

module.exports = router;