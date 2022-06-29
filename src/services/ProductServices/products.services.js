const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class ProductServices {
    constructor() {}

    /**
     * @description Create New Product
     */
    async createProduct(obj) {
        try {
            const response = await db.query(
                `INSERT INTO products (
                    store_id,
                    product_category_id,
                    name,
                    product_code,
                    uom_id,
                    price,
                    cost,
                    stocks,
                    low_stock_level,
                    productUrl
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING product_id`,
                [
                    obj.store_id,
                    obj.product_category_id,
                    obj.name,
                    obj.product_code,
                    obj.uom_id,
                    obj.price,
                    obj.cost,
                    obj.stocks,
                    obj.low_stock_level,
                    obj.productUrl
                ]
            );
            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].product_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Get Product
     */
     async getProducts(qFilter) {
        try {
            const { search_key, page_number, user_id, store_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    products.product_id,
                    products.store_id,
                    products.product_category_id,
                    product_categories.name,
                    products.name,
                    products.product_code,
                    products.uom_id,
                    unit_of_measure.name,
                    products.price,
                    products.cost,
                    products.stocks,
                    products.low_stock_level,
                    products.productUrl
                FROM products
                INNER JOIN stores ON products.store_id = stores.store_id
                LEFT JOIN product_categories ON products.product_category_id = product_categories.product_category_id
                LEFT JOIN unit_of_measure ON products.uom_id = unit_of_measure.uom_id
                WHERE products.name like '%' || $1 || '%'
                AND stores.user_id = $2
                AND products.store_id = $3
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
     * @description Get Product by Id
     */
     async getProductById(id) {
        try {
            // QUERY DATA
            const response = await db.query(
                `SELECT *
                FROM products
                WHERE product_id = $1
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
     * @description Update Product By Id
     */
    async updateProductById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE products
                SET
                    store_id = $2,
                    product_category_id = $3,
                    name = $4,
                    product_code = $5,
                    uom_id = $6,
                    price = $7,
                    cost = $8,
                    stocks = $9,
                    low_stock_level = $10,
                    productUrl = $11
                WHERE product_id = $1`,
                [
                    id,
                    obj.store_id,
                    obj.product_category_id,
                    obj.name,
                    obj.product_code,
                    obj.uom_id,
                    obj.price,
                    obj.cost,
                    obj.stocks,
                    obj.low_stock_level,
                    obj.productUrl
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
     * @description Delete Product By Id
     */
    async deleteProductById (id) {
        try {
            await db.query('DELETE FROM products WHERE product_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { product_id: id }
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
                FROM products
                INNER JOIN stores ON products.store_id = stores.store_id
                WHERE products.product_id = $1
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

module.exports = ProductServices;