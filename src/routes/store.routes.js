const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const storeController = require('../controllers/store/stores.controller');

// STORE
router.post('/', jwtAuthentication, storeController.postStoreController);
router.get('/', jwtAuthentication, storeController.getStoreController);
router.get('/:id', jwtAuthentication, storeController.getStoreByIdController);
router.put('/:id', jwtAuthentication, storeController.updateStoreByIdController);
router.delete('/:id', jwtAuthentication, storeController.deleteStoreByIdController);

module.exports = router;