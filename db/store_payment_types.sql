DROP TABLE store_payment_types;

CREATE TABLE store_payment_types (
	store_payment_type_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    is_cash BOOLEAN,
    is_vacash BOOLEAN,
    is_gcash BOOLEAN,
    is_paymaya BOOLEAN,
    currency VARCHAR(10)
);