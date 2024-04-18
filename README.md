WELCOME TO MANAGER INVENTORY MANAGER

An elegant solution to managing inventory.

Installation:
1. cd into front-end/inventory-manager
2. terminal: npm install
3. terminal: npm start
4. cd into back-end
5. terminal: npm install
6. Create a postgres databse called "zdb"
7. terminal: docker compose up --build
8. terminal: npm run migrate
9. terminal: npm run seed

Teardown:
1. Access terminal where docker compose up --build is running.
2. terminal: CTRL+C
3. terminal: docker compose down

Utilization:

--- VISITORS ---
You will not have access to add, edit, or delete items.
You can click on the View All Inventory button on the nav bar to pull our items.
You can drill down to a specific item by clicking on its row.

--- MANAGERS ---
When accessing the application, you will be redirected to the login screen.
As a new user, you will need to create a new account.
Otherwise, you can use the following credentials to login:
- Username: Manager1 
- Password: password

Upon signing up or loggin in, you will be redirected to your inventory page.
NAVBAR (functionality listed as seen from left to right)
Click on the View Your Inventory button to pull only inventory posted by you.
Click on the View All Inventory button to pull all inventory.
You will see a welcome message containing your username.
Click on the Logout button to logout and be redirected to the login page.

As a new user, you will not have any items in your inventory.
As Manager1, you will see multiple items pull.

Use the Add Item button to add inventory.
Upon adding inventory, you will be redirected back to your inventory.

Each item has an associated Edit and Delete button.
Edit will make the fields editable. When you hit Submit, it will update the fields for that item.
Delete will remove the item from inventory.

To view a specific item, click on the row that holds the item's information.
This redirects you to the item page. 

Testing:
Console Logs to test the functionality of my React App.
Postman to test the functionality of my API.
PostgreSQL VS Code extension to test changes to the DB.