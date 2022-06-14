const bcrypt = require('bcrypt');
const db = require('../../config/database/db');

class AuthService {
    constructor() {}

    /**
     * @description Create User
     */
    async createUser(userObj) {
        try {
            const currDateTime = new Date();
            const saltRounds = 10;
            // CHECK IF USER EXIST
            const getUserByEmail = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1',[userObj.email]);
            if(getUserByEmail.rows.length !== 0) return { error: 500, message: 'Email already used' }
            // ENCRYPT PASSWORD
            const passwordHash = await bcrypt.hash(userObj.password, saltRounds);
            // INSERT TO DB
            await db.query(
                'INSERT INTO users (name, email, password, birthdate, gender, phone, created_on, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [userObj.name, userObj.email, passwordHash, userObj.birthdate, userObj.gender, userObj.phone, currDateTime, currDateTime]
            );
            return {
                status: 200,
                message: 'Success',
                user: {
                    email: userObj.email
                }
            }
        } catch(err) {
            console.log(err);
            return { status: 500, message: 'An error occured' }
        }
    }
}

module.exports = AuthService;