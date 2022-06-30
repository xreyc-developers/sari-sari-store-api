const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class OrderProductServices {
    constructor() {}

    /**
     * @description Create New Order Product
     */
    async createOrderProduct(obj) {
        try {
            const response = await db.query(
                `INSERT INTO order_products (
                    order_id,
                    product_id,
                    product_name,
                    quantity,
                    price,
                    subtotal,
                    unitname,
                    productImg
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING order_product_id`,
                [
                    obj.order_id,
                    obj.product_id,
                    obj.product_name,
                    obj.quantity,
                    obj.price,
                    obj.subtotal,
                    obj.unitname,
                    obj.productImg
                ]
            );

            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].order_product_id
            }
        } catch(err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Update Order Product By Id
     */
    async updateOrderProductById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE order_products
                SET
                    quantity = $2,
                    price = $3,
                    subtotal = $4,
                    unitname = $5,
                    productImg = $6
                WHERE order_product_id = $1`,
                [
                    id,
                    obj.quantity,
                    obj.price,
                    obj.subtotal,
                    obj.unitname,
                    obj.productImg
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
     * @description Delete Order Product By Id
     */
    async deleteOrderProductById (id) {
        try {
            await db.query('DELETE FROM order_products WHERE order_product_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { order_product_id: id }
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }
}

module.exports = OrderProductServices;