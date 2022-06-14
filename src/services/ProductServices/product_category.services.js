const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class ProductCategoryServices {
    constructor() {}

    /**
     * @description Create New Product Category
     */
    async createProductCategory(obj) {
        try {
            const response = await db.query(
                `INSERT INTO product_categories (
                    store_id,
                    name,
                    code
                ) VALUES ($1, $2, $3)
                RETURNING product_category_id`,
                [
                    obj.store_id,
                    obj.name,
                    obj.code
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].product_category_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Product Category
     */
     async getProductCategories(qFilter) {
        try {
            const { search_key, page_number, user_id, store_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    product_categories.product_category_id,
                    product_categories.store_id,
                    product_categories.name,
                    product_categories.code
                FROM product_categories
                INNER JOIN stores ON product_categories.store_id = stores.store_id
                WHERE product_categories.name like '%' || $1 || '%'
                AND stores.user_id = $2
                AND product_categories.store_id = $3
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
     * @description Get Product Category by Id
     */
     async getProductCategoryById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM product_categories
                WHERE product_category_id = $1
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
     * @description Update Product Category By Id
     */
    async updateProductCategoryById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE product_categories
                SET
                    name = $2,
                    code = $3
                WHERE product_category_id = $1`,
                [
                    id,
                    obj.name,
                    obj.code
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
     * @description Delete Product Category By Id
     */
    async deleteProductCategoryById (id) {
        try {
            await db.query('DELETE FROM product_categories WHERE product_category_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { product_category_id: id }
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
                FROM product_categories
                INNER JOIN stores ON product_categories.store_id = stores.store_id
                WHERE product_categories.product_category_id = $1
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

module.exports = ProductCategoryServices;