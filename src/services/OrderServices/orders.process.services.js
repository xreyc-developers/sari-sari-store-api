const db = require('../../config/database/db');
const pagination = require('../../utils/query/pagination');
const OrderServices = require('./orders.services');
const OrderProductServices = require('./order_products.services');
const OrderServicesInstance = new OrderServices();
const OrderProductServicesInstance = new OrderProductServices();

class OrderWithProductTransactionServices {
    constructor() {}

    /**
     * @description Create Or Update Order
     */
    async createOrUpdateOrder(obj) {
        try {
            // GRAND TOTAL
            let grand_total = 0;
            for(let i = 0; i <= obj.productItems.length - 1; i++) { 
                obj.productItems[i]['subtotal'] = obj.productItems[i]['quantity'] * obj.productItems[i]['price'];
                grand_total += obj.productItems[i]['subtotal'];
            }
            // ORDER TO CREATE
            const orderData = {
                order_id: obj.order_id,
                store_id: obj.store_id,
                receipt_number: obj.receipt_number,
                grand_total: grand_total,
                customer_name: obj.customer_name,
                customer_number: obj.customer_number,
                customer_address: obj.customer_address,
                notes: obj.notes,
                coupon: obj.coupon,
                order_status: "On Cart",
                created_on: new Date()
            }
            // CREATE OR UPDATE ORDER
            if(obj.order_id === 0) {
                const createdResponse = await OrderServicesInstance.createOrder(orderData);
                orderData['order_id'] = createdResponse.id;
            } else {
                await OrderServicesInstance.updateOrderById(obj.order_id, obj);
            }
            // CREATE ORDER PRODUCT
            let orderProductsData = [];
            for(let i = 0; i <= obj.productItems.length - 1; i++) {
                const orderProductItem = {
                    order_product_id: obj.productItems[i]['order_product_id'],
                    order_id: orderData['order_id'],
                    product_id: obj.productItems[i]['product_id'],
                    product_name: obj.productItems[i]['product_name'],
                    quantity: obj.productItems[i]['quantity'],
                    price: obj.productItems[i]['price'],
                    subtotal: obj.productItems[i]['subtotal'],
                    unitname: obj.productItems[i]['unitname'],
                    productImg: obj.productItems[i]['productImg']
                }
                if(obj.productItems[i]['order_product_id'] === 0) {
                    const orderProductResponse = await OrderProductServicesInstance.createOrderProduct(orderProductItem);
                    orderProductItem['order_product_id'] = orderProductResponse.id;
                } else {
                    await OrderProductServicesInstance.updateOrderProductById(obj.productItems[i]['order_product_id'], orderProductItem);
                }
                orderProductsData.push(orderProductItem);
            }
            orderData['productItems'] = orderProductsData;
            return orderData;
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Update Status
     */
    async updateOrderStatus(id, obj) {
        try {
            await db.query(
                `UPDATE orders SET order_status = $2 WHERE order_id = $1`,
                [id, obj.order_status]
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
     * @description Get Product
     */
     async getOrdersWithProducts(qFilter) {
        try {
            const { page_number, user_id, store_id } = qFilter;
            const paginationOffset = pagination.paginationOffset(page_number);
            const paginationLimit = pagination.paginationLimit;
            // QUERY DATA
            const response = await db.query(
                `SELECT
                    orders.order_id,
                    orders.store_id,
                    orders.receipt_number,
                    orders.grand_total,
                    orders.customer_name,
                    orders.customer_number,
                    orders.customer_address,
                    orders.notes,
                    orders.coupon,
                    orders.order_status,
                    orders.created_on,
                    order_products.order_product_id,
                    order_products.order_id,
                    order_products.product_id,
                    order_products.product_name,
                    order_products.quantity,
                    order_products.price,
                    order_products.subtotal,
                    order_products.unitname,
                    order_products.productimg
                FROM orders
                INNER JOIN stores ON orders.store_id = stores.store_id
                INNER JOIN order_products ON orders.order_id = order_products.order_id
                WHERE stores.user_id = $1
                AND orders.store_id = $2
                ORDER BY orders.order_id DESC
                OFFSET $3 LIMIT $4`,
                [user_id, store_id, paginationOffset, paginationLimit]
            );

            let responseData = [];
            let orderData = {};
            let orderProductsData = [];
            let prevOrderId = 0;
            
            for(let i = 0; i <= response.rows.length - 1; i++) {
                // CHECK IF CURRENT ORDER ID IS SAME FROM THE PREVIOUS
                if(prevOrderId !== response.rows[i].order_id && i !== 0) {
                    orderData['productItems'] = orderProductsData;
                    responseData.push(orderData);
                    orderProductsData = [];
                }
                // SET ORDER DATA
                orderData = {
                    order_id: response.rows[i].order_id,
                    store_id: response.rows[i].store_id,
                    receipt_number: response.rows[i].receipt_number,
                    grand_total: Number(response.rows[i].grand_total),
                    customer_name: response.rows[i].customer_name,
                    customer_number: response.rows[i].customer_number,
                    customer_address: response.rows[i].customer_address,
                    notes: response.rows[i].notes,
                    coupon: response.rows[i].coupon,
                    order_status: response.rows[i].order_status,
                    created_on: response.rows[i].created_on
                }
                // SET ORDER PRODUCTS
                const orderProductItem = {
                    order_product_id: response.rows[i]['order_product_id'],
                    order_id: response.rows[i]['order_id'],
                    product_id: response.rows[i]['product_id'],
                    product_name: response.rows[i]['product_name'],
                    quantity: Number(response.rows[i]['quantity']),
                    price: Number(response.rows[i]['price']),
                    subtotal: Number(response.rows[i]['subtotal']),
                    unitname: response.rows[i]['unitname'],
                    productImg: response.rows[i]['productimg']
                }
                orderProductsData.push(orderProductItem);
                // PUSH THE LAST ITEM IF THIS IS THE LAST ITERATION
                if(i === response.rows.length - 1) {
                    orderData['productItems'] = orderProductsData;
                    responseData.push(orderData);
                    break;
                }
                // SET PREVIOUS ID
                prevOrderId = response.rows[i].order_id;
            }

            return {
                status: 200,
                message: 'Success',
                data: responseData
            }
        } catch (err) {
            console.log(err)
            return { status: 500, message: 'An error occured' }
        }
    }

    /**
     * @description Delete Order By Id
     */
     async deleteOrderById (id) {
        try {
            // DELETE ORDER
            await OrderServicesInstance.deleteOrderById(id);
            // GET ORDER PRODUCTS
            const response = await db.query(
                `SELECT order_products.order_product_id FROM order_products WHERE order_products.order_id = $1`,
                [id]
            );
            // DELETE ALL ORDER PRODUCTS
            for(let i = 0; i <= response.rows.length - 1; i++) {
                await OrderProductServicesInstance.deleteOrderProductById(response.rows[i].order_product_id)
            }
            return {
                status: 200,
                message: 'Success',
                data: { order_id: id }
            }
        } catch (err) {
            return { status: 500, message: 'An error occured' }
        }
    }
}

module.exports = OrderWithProductTransactionServices;