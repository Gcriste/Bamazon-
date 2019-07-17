DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT(30) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(30) NOT NULL,
 
  PRIMARY KEY (item_id),
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Electric Guitar", "Music", 799.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lawnmower", "Garden", 199.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Appliances", 29.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fan", "Electronics", 19.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Refrigerator", "Appliances", 1299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home", 39.99, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drumset", "Music", 1099.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 899.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home", 29.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cups", "Kitchen", 3.99, 253);


SELECT * FROM products;

