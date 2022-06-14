const router = require('express-promise-router')();
const authController = require('../controllers/authentication/auth.controllers');

/**
 * @description Authentication Routes
 */
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;