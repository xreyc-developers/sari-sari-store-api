DROP TABLE order_products;

CREATE TABLE order_products (
	order_product_id serial PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    subtotal NUMERIC NOT NULL,
    unitname VARCHAR,
    productImg VARCHAR
);