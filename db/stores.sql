DROP TABLE stores;

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