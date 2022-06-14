DROP TABLE payment_transactions;

CREATE TABLE payment_transactions (
	payment_transaction_id serial PRIMARY KEY,
    payment_id INTEGER NOT NULL,
    payment_reference VARCHAR(50) NOT NULL,
    payment_type VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_amount NUMERIC NOT NULL,
    payment_change NUMERIC NOT NULL,
    wallet_reference VARCHAR(50),
    wallet_number VARCHAR(50),
    wallet_name VARCHAR(50),
    payment_status VARCHAR(50),
    created_on TIMESTAMP NOT NULL
);