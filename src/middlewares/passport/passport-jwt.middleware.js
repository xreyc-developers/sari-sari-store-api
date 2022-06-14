const passport = require('passport');

/**
 * @description verify token based on the configuraion
 */
module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, jwtPayload) => {
        // VALIDATE USER AUTHENTICATION
        if (err || !jwtPayload) return res.status(401).json({ status: 401, message: 'Unauthorize' });
        // SET USER INFO
        res.locals.user = {
            user_id: jwtPayload.user_id,
            email: jwtPayload.email,
            role: jwtPayload.role
        }
        next();
    })(req, res, next);
}

