# Bamazon

<strong>Project Developer:</strong> <br/>Jessica Katelyn Blomer  

<strong>Project Description:</strong> <br/>I created an Amazon-like storefront node console application in which I included the node inquirer package to capture data input from the customer. <br/> I included the mysql node package to query and update my Bamazon database to reflect the customer's order when a customer makes an order from the store's inventory and then the customer's purchase is calculated and displayed.

<strong>Project Logic:</strong> <br/>Upon program start up, a complete inventory of the products table from the Bamazon database is displayed to the customer via the node command line.<br/> The item ID, product name, department name, price and amount in stock displays to the customer.<br/>
The customer is next prompted to either choose a department or enter in an item ID. Either option will then prompt the customer to enter in an Item ID and amount of the item desired. <br/>The program will now query into the database to make sure the item's quantity is available for the customer's purchase. <br/> If the item does not have sufficient quantity to complete the customer's order, a message will display to the customer and they will have an option to either start the program again or exit.<br/> If the item has sufficient quantity, the program will subtract the stock of the item in the database, display the total cost of the purchase, and an option to either start the program again or exit.

Please watch a demonstration here:  
https://www.youtube.com/watch?v=9-GzBXwN2W0&feature=youtu.be


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

