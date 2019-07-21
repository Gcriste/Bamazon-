var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Nirvana5430",
    database: "bamazon_DB"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    runSearch();
});




function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}


//function for the current products coming from mysql table
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
            choiceArray.push({
                id: results[i].item_id,
                name: results[i].product_name,
                department: results[i].department_name,
                price: results[i].price,
                stock: results[i].stock_quantity
            })
        }
        console.table(choiceArray);
        runSearch();

    })
}

function viewLow() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
            choiceArray.push({
                id: results[i].item_id,
                name: results[i].product_name,
                department: results[i].department_name,
                price: results[i].price,
                stock: results[i].stock_quantity
            })
        }

        for (var i = 0; i < choiceArray.length; i++) {
            if (choiceArray[i].stock < 5) {
                console.log(choiceArray[i].name, choiceArray[i].stock)
            }
        }
        runSearch();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
            choiceArray.push({
                id: results[i].item_id,
                name: results[i].product_name,
                department: results[i].department_name,
                price: results[i].price,
                stock: results[i].stock_quantity
            })
        }
        console.table(choiceArray)

        inquirer
            .prompt([{
                name: "choice",
                type: "input",
                message: "Enter the id for the item would you like to add more inventory",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter the correct id for the item you would like to add more inventory";
                }
            }, {

                name: "add",
                type: "input",
                message: "How many units would you like to add to the current inventory?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter the number of units you would like to add";
                }

            }])
            .then(function (answer) {
                var answerId = answer.choice;

                var query = "SELECT product_name,price,stock_quantity FROM products WHERE ?";
                connection.query(query, {
                    item_id: answerId
                }, function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        var currentStock = res[i].stock_quantity

                        var newStock = parseInt(currentStock) + parseInt(answer.add);
                        connection.query("UPDATE products SET ? WHERE ?",
                            [{
                                stock_quantity: newStock
                            }, {
                                item_id: answerId
                            }])
                        console.log("Congratulations! You added " + answer.add + " " + res[i].product_name + "s to the current stock quantity")
                        viewProducts();
                    }
                })
                runSearch();
            })
    })
}

function addProduct() {


    inquirer.prompt([{
            name: "name",
            type: "input",
            message: "What is the name of the new product?"
        }, {
            name: "department",
            type: "input",
            message: "What department does the new product belong in?"

        }, {
            name: "price",
            type: "input",
            message: "how much does this product cost?"
        }, {
            name: "stock",
            type: "input",
            message: "how many are in stock?"
        }])
        .then(function (answer) {
            var name = answer.name;
            var department = answer.department;
            var price = answer.price;
            var stock = answer.stock;

            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: name,
                    department_name: department,
                    price: price,
                    stock_quantity: stock
                },

                function (err) {
                    if (err) throw err;
                    console.log("Congratulations! You added " + stock + " " + name + "s to the " + "department " + department + " for a price of " + price + " dollars.")
                    runSearch();
                }
            )
        })
}