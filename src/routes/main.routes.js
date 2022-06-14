const router = require('express-promise-router')();

/**
 * @description Authentication Routes
 */
router.post('/', (req, res) => {
    return res.status(200).json({
        name: "Sari-sari-store-api",
        vesion: 0.1
    });
});

module.exports = router;