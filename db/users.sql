DROP TABLE users;

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