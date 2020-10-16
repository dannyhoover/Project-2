CREATE DATABASE recipe_db;
USE recipe_db;

CREATE TABLE recipes
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);