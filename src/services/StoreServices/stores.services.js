const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class StoreServices {
    constructor() {}

    /**
     * @description Create New Store
     */
    async createStore(obj) {
        try {
            const response = await db.query(
                `INSERT INTO stores (
                    user_id,
                    name,
                    phone,
                    open_time,
                    close_time,
                    address1,
                    address2,
                    address3,
                    address4,
                    address5,
                    store_logo_url
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING store_id`,
                [
                    obj.user_id,
                    obj.name,
                    obj.phone,
                    obj.open_time,
                    obj.close_time,
                    obj.address1,
                    obj.address2,
                    obj.address3,
                    obj.address4,
                    obj.address5,
                    obj.store_logo_url
                ]
            );

            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].store_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Stores
     */
    async getStore(qFilter) {
        try {
            const { search_key, page_number, user_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM stores
                WHERE stores.name like '%' || $1 || '%'
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
     * @description Get Store by Id
     */
     async getStoreById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM stores
                WHERE stores.store_id = $1
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
    async updateStoreById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE stores
                SET
                    name = $2,
                    phone = $3,
                    open_time = $4,
                    close_time = $5,
                    address1 = $6,
                    address2 = $7,
                    address3 = $8,
                    address4 = $9,
                    address5 = $10,
                    store_logo_url = $11
                WHERE store_id = $1`,
                [
                    id,
                    obj.name,
                    obj.phone,
                    obj.open_time,
                    obj.close_time,
                    obj.address1,
                    obj.address2,
                    obj.address3,
                    obj.address4,
                    obj.address5,
                    obj.store_logo_url
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
     * @description Delete Store By Id
     */
    async deleteStoreById (id) {
        try {
            await db.query('DELETE FROM stores WHERE store_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { store_id: id }
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }
}

module.exports = StoreServices;