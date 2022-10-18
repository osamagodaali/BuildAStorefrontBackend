/* Replace with your SQL commands */

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);