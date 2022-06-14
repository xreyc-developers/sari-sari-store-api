const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const storeCouponController = require('../controllers/store/store_coupons.controller');

// STORE COUPON
router.post('/', jwtAuthentication, storeCouponController.postStoreCouponsController);
router.get('/', jwtAuthentication, storeCouponController.getStoreCouponController);
router.get('/:id', jwtAuthentication, storeCouponController.getStoreCouponsByIdController);
router.put('/:id', jwtAuthentication, storeCouponController.updateStoreCouponsByIdController);
router.delete('/:id', jwtAuthentication, storeCouponController.deleteStoreCouponsByIdController);

module.exports = router;