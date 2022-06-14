const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class StoreCouponServices {
    constructor() {}

    /**
     * @description Create New Store
     */
    async createStoreCoupon(obj) {
        try {
            const response = await db.query(
                `INSERT INTO store_coupons (
                    store_id,
                    code,
                    amount
                ) VALUES ($1, $2, $3)
                RETURNING store_coupon_id`,
                [
                    obj.store_id,
                    obj.code,
                    obj.amount
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].store_coupon_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Stores
     */
     async getStoreCoupons(qFilter) {
        try {
            const { search_key, page_number, user_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    store_coupons.store_coupon_id,
                    store_coupons.store_id,
                    store_coupons.code,
                    store_coupons.amount
                FROM store_coupons
                INNER JOIN stores ON store_coupons.store_id = stores.store_id
                WHERE store_coupons.code like '%' || $1 || '%'
                AND stores.user_id = $2
                OFFSET $3 LIMIT $4`,
                [search_key, user_id, paginationOffset, paginationLimit]
            );
            return {
                status: 200,
                message: 'Success',
                data: response.rows
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Store Coupon by Id
     */
     async getStoreCouponById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM store_coupons
                WHERE store_coupon_id = $1
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
     * @description Update Store Coupon By Id
     */
    async updateStoreCouponById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE store_coupons
                SET
                    store_id = $2,
                    code = $3,
                    amount = $4
                WHERE store_coupon_id = $1`,
                [
                    id,
                    obj.store_id,
                    obj.code,
                    obj.amount
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
     * @description Delete Store Coupon By Id
     */
    async deleteStoreCouponById (id) {
        try {
            await db.query('DELETE FROM store_coupons WHERE store_coupon_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { store_coupon_id: id }
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
                FROM store_coupons
                INNER JOIN stores ON store_coupons.store_id = stores.store_id
                WHERE store_coupons.store_coupon_id = $1
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

module.exports = StoreCouponServices;