DROP TABLE products;

CREATE TABLE products (
	product_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    product_category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    product_code VARCHAR(50) NOT NULL,
    uom_id INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    cost NUMERIC NOT NULL,
    stocks NUMERIC,
    low_stock_level NUMERIC
);