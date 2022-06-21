const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const productCategoryController = require('../controllers/product/product_category.controller');

// PRODUCT CATEGORY
router.post('/', jwtAuthentication, productCategoryController.postProductCategoryController);
router.post('/', jwtAuthentication, productCategoryController.getProductCategoryController);
router.get('/:id', jwtAuthentication, productCategoryController.getProductCategoryByIdController);
router.put('/:id', jwtAuthentication, productCategoryController.updateProductCategoryByIdController);
router.delete('/:id', jwtAuthentication, productCategoryController.deleteProductCategoryByIdController);

module.exports = router;