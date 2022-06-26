const router = require('express-promise-router')();

/**
 * @description Authentication Routes
 */
router.get('/', (req, res) => {
    return res.status(200).json({
        name: "Sari-sari-store-api",
        vesion: 0.1
    });
});

router.get('/login/', (req, res) => {
    return res.status(200).json({
        name: "Sari-sari-store-api",
        vesion: 0.1
    });
});

module.exports = router;