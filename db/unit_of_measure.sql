DROP TABLE unit_of_measure;

CREATE TABLE unit_of_measure (
	uom_id serial PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL
);