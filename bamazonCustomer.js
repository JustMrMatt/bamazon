var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "MAPa$$26-Dec",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("\n");
    console.log("connected as " + connection.threadId);
    console.log("\n");
    inventory();
  });

function inventory() {

    var newTable = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [12, 50, 20, 20, 20]
    });

    inventoryList();

    function inventoryList() {
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

                    newTable.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
            }
            console.log("\n");
            console.log(newTable.toString());
            console.log("\n");
            userPrompt();
        });
    }
}

function userPrompt() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "Please enter the ID number for the item you would like to buy.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many would you like?",

    }
    ]).then(function(userPurchase) {

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {
                    console.log("\n");
                    console.log("That item is currently out of stock!");
                    console.log("\n");
                    userPrompt();
                } else {
                    console.log("\n");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("\n");
                    console.log("\n");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("\n");

                    var updatedStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    confirmation(updatedStock, purchaseId);
                }
            }
        });
    });
}

function confirmation(updatedStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you ready to checkout?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updatedStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("Your transaction is now complete")
            inventory();
        } else {
            console.log("Have a nice day!")
            inventory();
        }
    });
}