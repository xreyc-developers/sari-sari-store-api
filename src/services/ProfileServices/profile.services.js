const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class ProfileServices {
    constructor() {}

    /**
     * @description Get User By Id
     */
     async getProfileById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    user_id,
                    name,
                    email,
                    birthdate,
                    gender,
                    phone
                FROM users
                WHERE user_id = $1
                LIMIT 1`,
                [id]
            );
            return {
                status: 200,
                message: 'Success',
                data: response.rows[0]
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Update User By Id
     */
    async updateUserById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE users
                SET
                    name = $2,
                    email = $3,
                    birthdate = $4,
                    gender = $5,
                    phone = $6
                WHERE user_id = $1`,
                [
                    id,
                    obj.name,
                    obj.email,
                    obj.birthdate,
                    obj.gender,
                    obj.phone
                ]
            );
            return {
                status: 200,
                message: 'Sucess',
                data: obj
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Delete User By Id
     */
    async deleteUserById (id) {
        try {
            await db.query('DELETE FROM users WHERE user_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { user_id: id }
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

}

module.exports = ProfileServices;