const db = require('../../config/database/db');

class StorePaymentTypeServices {
    constructor() {}

    /**
     * @description Create New Store
     */
    async createStorePaymentType(obj) {
        try {
            const response = await db.query(
                `INSERT INTO store_payment_types (
                    store_id,
                    is_cash,
                    is_vacash,
                    is_gcash,
                    is_paymaya,
                    currency
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING store_payment_type_id`,
                [
                    obj.store_id,
                    obj.is_cash,
                    obj.is_vacash,
                    obj.is_gcash,
                    obj.is_paymaya,
                    obj.currency
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].store_payment_type_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Store by Id
     */
     async getStorePaymentTypeById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM store_payment_types
                WHERE store_payment_types.store_payment_type_id = $1
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
     * @description Update Store By Id
     */
    async updateStorePaymentTypeById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE store_payment_types
                SET
                    is_cash = $2,
                    is_vacash = $3,
                    is_gcash = $4,
                    is_paymaya = $5,
                    currency = $6
                WHERE store_payment_type_id = $1`,
                [
                    id,
                    obj.is_cash,
                    obj.is_vacash,
                    obj.is_gcash,
                    obj.is_paymaya,
                    obj.currency
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Delete Store By Id
     */
    async deleteStorePaymentTypeById (id) {
        try {
            await db.query('DELETE FROM store_payment_types WHERE store_payment_type_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { store_payment_type_id: id }
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get resource owner
     */
     async getOwnerId(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT stores.user_id
                FROM store_payment_types
                INNER JOIN stores ON store_payment_types.store_id = stores.store_id
                WHERE store_payment_types.store_payment_type_id = $1
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
}

module.exports = StorePaymentTypeServices;