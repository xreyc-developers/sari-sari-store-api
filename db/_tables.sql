CREATE TABLE order_products (
	order_product_id serial PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    subtotal NUMERIC NOT NULL
);

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

CREATE TABLE product_categories (
	product_category_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL
);

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

CREATE TABLE store_coupons (
	store_coupon_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    code VARCHAR(15) NOT NULL,
    amount NUMERIC NOT NULL
);

CREATE TABLE store_discounts (
	store_discount_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    discount_type VARCHAR(100) NOT NULL
);

CREATE TABLE store_payment_types (
	store_payment_type_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    is_cash BOOLEAN,
    is_vacash BOOLEAN,
    is_gcash BOOLEAN,
    is_paymaya BOOLEAN,
    currency VARCHAR(10)
);

CREATE TABLE stores (
	store_id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    open_time TIMESTAMP,
    close_time TIMESTAMP,
    address1 VARCHAR(1024),
    address2 VARCHAR(1024),
    address3 VARCHAR(1024),
    address4 VARCHAR(1024),
    address5 VARCHAR(1024),
    store_logo_url VARCHAR(2048)
);

CREATE TABLE unit_of_measure (
	uom_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE users (
	user_id serial PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	birthdate TIMESTAMP NOT NULL,
	gender VARCHAR(6) NOT NULL,
    phone VARCHAR(15),
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);