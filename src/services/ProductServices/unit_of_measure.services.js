const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class UnitOfMeasureServices {
    constructor() {}

    /**
     * @description Create New Unit of Measure
     */
    async createUnitOfMeasure(obj) {
        try {
            const response = await db.query(
                `INSERT INTO unit_of_measure (
                    store_id,
                    name,
                    unit
                ) VALUES ($1, $2, $3)
                RETURNING uom_id`,
                [
                    obj.store_id,
                    obj.name,
                    obj.unit
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].uom_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Unit of Measure
     */
     async getUnitOfMeasures(qFilter) {
        try {
            const { search_key, page_number, user_id, store_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    unit_of_measure.uom_id,
                    unit_of_measure.store_id,
                    unit_of_measure.name,
                    unit_of_measure.unit
                FROM unit_of_measure
                INNER JOIN stores ON unit_of_measure.store_id = stores.store_id
                WHERE unit_of_measure.name like '%' || $1 || '%'
                AND stores.user_id = $2
                AND unit_of_measure.store_id = $3
                OFFSET $4 LIMIT $5`,
                [search_key, user_id, store_id, paginationOffset, paginationLimit]
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
     * @description Get Unit of Measure by Id
     */
     async getUnitOfMeasureById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM unit_of_measure
                WHERE uom_id = $1
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
     * @description Update Unit of Measure By Id
     */
    async updateUnitOfMeasureById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE unit_of_measure
                SET
                    store_id = $2,
                    name = $3,
                    unit = $4
                WHERE uom_id = $1`,
                [
                    id,
                    obj.store_id,
                    obj.name,
                    obj.unit
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
     * @description Delete Unit of Measure By Id
     */
    async deleteUnitOfMeasureById (id) {
        try {
            await db.query('DELETE FROM unit_of_measure WHERE uom_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { uom_id: id }
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
                FROM unit_of_measure
                INNER JOIN stores ON unit_of_measure.store_id = stores.store_id
                WHERE unit_of_measure.uom_id = $1
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

module.exports = UnitOfMeasureServices;