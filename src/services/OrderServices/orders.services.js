const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');

class OrderServices {
    constructor() {}

    /**
     * @description Create New Order
     */
    async createOrder(obj) {
        try {
            const response = await db.query(
                `INSERT INTO orders (
                    store_id,
                    receipt_number,
                    grand_total,
                    customer_name,
                    customer_number,
                    customer_address,
                    notes,
                    coupon,
                    order_status,
                    created_on
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING order_id`,
                [
                    obj.store_id,
                    obj.receipt_number,
                    obj.grand_total,
                    obj.customer_name,
                    obj.customer_number,
                    obj.customer_address,
                    obj.notes,
                    obj.coupon,
                    obj.order_status,
                    obj.created_on
                ]
            );

            return {
                status: 200,
                message: 'Success',
                data: obj,
                id: response.rows[0].order_id
            }
        } catch(err) {
            console.log(err)
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Update Order By Id
     */
    async updateOrderById(id, obj) {
        try {
            const response = await db.query(
                `UPDATE orders
                SET
                    receipt_number = $2,
                    grand_total = $3,
                    customer_name = $4,
                    customer_number = $5,
                    customer_address = $6,
                    notes = $7,
                    coupon = $8,
                    order_status = $9,
                    created_on = $10
                WHERE order_id = $1`,
                [
                    id,
                    obj.receipt_number,
                    obj.grand_total,
                    obj.customer_name,
                    obj.customer_number,
                    obj.customer_address,
                    obj.notes,
                    obj.coupon,
                    obj.order_status,
                    obj.created_on
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
     * @description Delete Order By Id
     */
    async deleteOrderById (id) {
        try {
            await db.query('DELETE FROM orders WHERE order_id = $1', [id]);
            return {
                status: 200,
                message: 'Success',
                data: { order_id: id }
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
                FROM orders
                INNER JOIN stores ON orders.store_id = stores.store_id
                WHERE orders.order_id = $1
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

module.exports = OrderServices;