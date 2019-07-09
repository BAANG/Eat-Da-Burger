DROP DATABASE IF EXISTS dog_db;
CREATE DATABASE dog_db;
USE dog_db;

CREATE TABLE doggies (
    id INT AUTO_INCREMENT NOT NULL,
    doggy_name VARCHAR(50) NOT NULL,
    doggy_type VARCHAR(50) NOT NULL,
    isGoodBoy BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);

