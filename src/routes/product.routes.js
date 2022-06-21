const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const productController = require('../controllers/product/products.controller');

// PRODUCT
router.post('/', jwtAuthentication, productController.postProductController);
router.post('/all', jwtAuthentication, productController.getProductController);
router.get('/:id', jwtAuthentication, productController.getProductByIdController);
router.put('/:id', jwtAuthentication, productController.updateProductByIdController);
router.delete('/:id', jwtAuthentication, productController.deleteProductByIdController);

module.exports = router;