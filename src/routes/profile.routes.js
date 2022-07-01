const router = require('express-promise-router')();
// MIDDLEWARES
const jwtAuthentication = require('../middlewares/passport/passport-jwt.middleware');
// CONTROLLERS
const profileController = require('../controllers/profile/profiles.controller');

// PRODUCT CATEGORY
router.get('/', jwtAuthentication, profileController.getProfileByIdController);
router.put('/:id', jwtAuthentication, profileController.updateProfileByIdController);
router.delete('/:id', jwtAuthentication, profileController.deleteProfileByIdController);

module.exports = router;