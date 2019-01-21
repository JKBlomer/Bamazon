var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8888,
    user: "root",
    password: "root",
    database: "bamazon"

});


var prodID = "";
var suppAmt = "";
var department = "";
var customerPurchase = 0;
var purchaseProduct = "";





function queryDatabase(){
    var result = "";
    var query3 = connection.query("select * from products where ?",[{
        item_id: prodID
    }], function (err, res){
        if(err) throw err;
        
        if(res[0].stock_quantity >= suppAmt){

            customerPurchase = res[0].price * suppAmt;
            purchaseProduct = res[0].product_name;
            var newAmt = res[0].stock_quantity - suppAmt;
            var query4 = connection.query("update products set ? where ?",[{

                stock_quantity: newAmt  
            },{
                item_id: prodID
            }], function(error, result){

                if(error)throw error;
                console.log("\n-----------------------------------");
                console.log("********Purchase complete**********");
                console.log("-----------------------------------");
                console.log("Your purchase: \n" + suppAmt + " "+ purchaseProduct.toUpperCase() + " for: $" + customerPurchase);
                console.log("-----------------------------------");
                startOrExit();
            });
        } else {
            console.log("--------------------------------------");
            console.log("*********INSUFFICIENT STOCK***********");
            console.log("--------------------------------------");
            startOrExit();
        }
    });
}

function customerPrompt() {
    inquirer.prompt([{
        type: "input",
        name: "productID",
        message: "Please enter in ITEM ID",
        validate: function (value) {
            if (isNaN(value)) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        type: "input",
        name: "supplyAmount",
        message: "How many units of the product would you like to buy?",
        validate: function (value) {
            if (isNaN(value)) {
                return false;
            } else {
                return true;
            }
        }
    }]).then(function (answer) {
        prodID = answer.productID;
        suppAmt = answer.supplyAmount;

        queryDatabase();
    })
}

function displayDepartmentProducts() {
    var query1 = connection.query("select * from products where ?", [{
        department_name: department
    }], function (err, res) {

        console.log("\n");
        console.log("--------- " + department.toUpperCase() + " DEPARTMENT ---------")
        for (var r in res) {
            console.log("Item ID: " + res[r].item_id + " | Product: " + res[r].product_name + " | Price: $" + res[r].price + " | Quantity Available: " + res[r].stock_quantity);
        }
        console.log("-----------------------------");
        customerPrompt();
    })
}

function chooseDepartmentOrID() {
    inquirer.prompt([{
        type: "list",
        name: "department",
        message: "Please choose a department or enter in an ITEM ID",
        choices: [
            "bedroom",
            "bathroom",
            "dining room",
            "kitchen",
            "living room",
            "office",
            "ENTER IN ITEM ID"
        ]
    }]).then(function (an) {

        if (an.department === "ENTER IN ITEM ID") {
            customerPrompt();
        } else {
            department = an.department;
            displayDepartmentProducts();
        }

    })
}


function startProgram() {

    var query = connection.query("select * from products", function (error, res) {
        if (error) throw error;
        console.log("-----------------------------");
        console.log("WELCOME TO BAMAZON\n");

        for (var r in res) {
            console.log("Item ID: " + res[r].item_id + " | Product: " + res[r].product_name + " | Price: $" + res[r].price + " | Quantity Available: " + res[r].stock_quantity);
        }
        console.log("-----------------------------");
        debugger;
        chooseDepartmentOrID();
    })
}

function startOrExit() {
    inquirer.prompt([{
        type: "list",
        name: "yesNo",
        message:"Would you like to place another order?",
        choices: [
            "YES, place another order",
            "No, exit program"
        ]
    }]).then(function(ans){
        if(ans.yesNo === "YES, place another order"){
            startProgram();
        } else{
            connection.end();
        }
    })
}

connection.connect();
startProgram();