DROP TABLE payments;

CREATE TABLE payments (
	payment_id serial PRIMARY KEY,
    order_id INTEGER NOT NULL,
    payment_modes VARCHAR(50) NOT NULL,
    total_amount_to_pay NUMERIC NOT NULL,
    total_amount_received NUMERIC NOT NULL,
    total_coupon_applied NUMERIC NOT NULL,
    total_change_amount NUMERIC NOT NULL,
    created_on TIMESTAMP NOT NULL
);