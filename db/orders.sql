DROP TABLE orders;

CREATE TABLE orders (
	order_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    receipt_number VARCHAR(255) NOT NULL,
    grand_total NUMERIC NOT NULL,
    customer_name VARCHAR(255),
    customer_number VARCHAR(255),
    customer_address VARCHAR(255),
    notes VARCHAR(255),
    coupon VARCHAR(255),
    order_status VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL
);