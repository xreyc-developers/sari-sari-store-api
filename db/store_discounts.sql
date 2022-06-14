DROP TABLE store_discounts;

CREATE TABLE store_discounts (
	store_discount_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    discount_type VARCHAR(100) NOT NULL
);