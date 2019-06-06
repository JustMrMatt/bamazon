CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(25) NULL,
	price DECIMAL(65,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Power Perch", "Household", 12.99, 100), ("Sink Shroom", "Household", 11.99, 100), ("Yoga Mat", "Excercise", 15.99, 100), ("Crossbody Bag", "Accesories", 19.85, 100), ("The Wonky Donkey", "Books", 7.99, 100), ("Pet Hair Remover Glove", "Pet Care", 16.99, 100), ("Microfiber Sheets", "Bedding", 18.95, 100), ("White Noise Machine", "Household", 29.99, 100), ("RFID Blocking Wallet", "Accesories", 19.99, 100), ("Burgindy Rubber Plant", "Household", 49.99, 100);

SELECT * FROM products;