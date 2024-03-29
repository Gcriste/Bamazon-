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
    currentProducts();
});




//function for the current products coming from mysql table
function currentProducts() {
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
        for (var i =0;i<choiceArray.length;i++){
             console.log(choiceArray[i].id, choiceArray[i].name, choiceArray[i].price)
            
           };
        selectProduct();

    })
}

//function to ask the user about the product id and the number of items they woud like to purchase
function selectProduct() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "choice",
                    type: "input",
                    message: "Please enter the id of the product you would like to buy",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return "Please enter a valid id number from the table above";
                    }
                },
                {
                    name: "buy",
                    type: "input",
                    message: "How many units would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return "Please enter the number of units you would like to purchase";
                    }
                }
            ])


            // function for the answers provided by user
            .then(function (answer) {
                var answerId = answer.choice;

                var query = "SELECT product_name,price,stock_quantity FROM products WHERE ?";
                connection.query(query, { item_id: answerId }, function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                    var currentStock = res[i].stock_quantity 
                    if (currentStock> answer.buy){
                        var newStock = currentStock-answer.buy;
                        connection.query("UPDATE products SET ? WHERE ?",
                        [{
                           stock_quantity:newStock
                        },{
                            item_id:answerId
                        }])
                        console.log("Congratulations! You bought "+ answer.buy + " " +  res[i].product_name + "s for " + res[i].price + " dollars each for a total of " + Math.floor((answer.buy * res[i].price)) + " dollars.")
                        currentProducts();
                    }
                    else{
                        console.log("I'm sorry there are not enough available in stock for your request. Please try again.")
                        currentProducts();
                    }
                 
                }
                })
            })
    })
}



