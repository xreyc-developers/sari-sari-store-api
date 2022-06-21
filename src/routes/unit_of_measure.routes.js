const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const unitOfMeasureController = require('../controllers/product/unit_of_measure.controller');

// UNIT OF MEASURE
router.post('/', jwtAuthentication, unitOfMeasureController.postUnitOfMeasureController);
router.post('/', jwtAuthentication, unitOfMeasureController.getUnitOfMeasureController);
router.get('/:id', jwtAuthentication, unitOfMeasureController.getUnitOfMeasureByIdController);
router.put('/:id', jwtAuthentication, unitOfMeasureController.updateUnitOfMeasureByIdController);
router.delete('/:id', jwtAuthentication, unitOfMeasureController.deleteUnitOfMeasureByIdController);

module.exports = router;