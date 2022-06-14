DROP TABLE store_coupons;

CREATE TABLE store_coupons (
	store_coupon_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    code VARCHAR(15) NOT NULL,
    amount NUMERIC NOT NULL
);