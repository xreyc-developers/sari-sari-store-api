const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class StoreDiscountServices {
    constructor() {}

    /**
     * @description Create New Store
     */
    async createStoreDiscount(obj) {
        try {
            const response = await db.query(
                `INSERT INTO store_discounts (
                    store_id,
                    description,
                    amount,
                    discount_type
                ) VALUES ($1, $2, $3, $4)
                RETURNING store_discount_id`,
                [
                    obj.store_id,
                    obj.description,
                    obj.amount,
                    obj.discount_type
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].store_discount_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Stores
     */
     async getStoreDiscounts(qFilter) {
        try {
            const { search_key, page_number, user_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    store_discounts.store_discount_id,
                    store_discounts.store_id,
                    store_discounts.description,
                    store_discounts.amount,
                    store_discounts.discount_type
                FROM store_discounts
                INNER JOIN stores ON store_discounts.store_id = stores.store_id
                WHERE store_discounts.description like '%' || $1 || '%'
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
     * @description Get Store Discount by Id
     */
     async getStoreDiscountById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM store_discounts
                WHERE store_discount_id = $1
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
     * @description Update Store Discount By Id
     */
    async updateStoreDiscountById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE store_discounts
                SET
                    store_id = $2,
                    description = $3,
                    amount = $4,
                    discount_type = $5
                WHERE store_discount_id = $1`,
                [
                    id,
                    obj.store_id,
                    obj.description,
                    obj.amount,
                    obj.discount_type
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
     * @description Delete Store Discount By Id
     */
    async deleteStoreDiscountById (id) {
        try {
            await db.query('DELETE FROM store_discounts WHERE store_discount_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { store_discount_id: id }
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
                FROM store_discounts
                INNER JOIN stores ON store_discounts.store_id = stores.store_id
                WHERE store_discounts.store_discount_id = $1
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

module.exports = StoreDiscountServices;