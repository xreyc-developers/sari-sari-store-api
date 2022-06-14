const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const randtoken = require('rand-token');
// MODELS
const AuthModel = require('../../models/auth.model');
// SERVICES
const AuthService = require('../../services/AuthServices/auth.services');
const AuthServiceInstance = new AuthService();

dotenv.config();

/**
 * @description Register
 */
exports.registerUser = async (req, res) => {
    try {
        // VALIDATE DATA
        const validatedData = AuthModel.validateRegister(req.body);
        if(validatedData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
        // CREATE VALIDATED DATA
        const { name, email, password, birthdate, gender, phone } = validatedData.value;
        const response = await AuthServiceInstance.createUser({ name, email, password, birthdate, gender, phone });
        return res.json(response);
    } catch(err) {
        return res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
}

/**
 * @description Login
 */
exports.loginUser = async (req, res, next) => {
    // VALIDATE DATA
    const validateData = AuthModel.validateLogin(req.body);
    if(validateData.error) return res.status(500).json({ status: 500, message: 'Bad request' });
    // LOCAL AUTHENTICATION
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) return res.status(500).json({ status: 500, message: info.message });
            
            req.logIn(user, { session: false }, async (error) => {
                // CHECK IF ERROR
                if(error) return next(error);
                // SET TOKEN PAYLOADS
                const payload = {
                    user_id: user.user_id,
                    email: user.email,
                    role: ['registered']
                };
                // SET VERIFICATION OPTIONS
                const verifyOptions = {
                    issuer: process.env.API_ISSUER,
                    audience: process.env.API_AUDIENCE,
                    expiresIn: '12h'
                };
                // GENERATE ACCESS TOKEN
                const access_token = jwt.sign(payload, process.env.API_PUBLIC_KEY, verifyOptions);
                // GENERATE REFRESH TOKENS
                const now = new Date();
                const randomNumber = Math.floor(Math.random() * (256 - 200 + 1) + 200);
                const refresh_token = randtoken.generate(randomNumber);
                // SEND TOKEN
                return res.json({
                    access_token,
                    refresh_token,
                    email: user.email,
                    iat: Math.floor(now/1000),
                    exp: Math.floor(now.setHours(now.getHours() + 12)/1000)
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}