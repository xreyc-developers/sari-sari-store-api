DROP TABLE product_categories;

CREATE TABLE product_categories (
	product_category_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL
);