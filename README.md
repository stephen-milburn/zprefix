WELCOME TO MANAGER INVENTORY MANAGER

An elegant solution to managing inventory.

Installation:
1. cd into back-end
2. terminal1: docker compose up --build
3. terminal2: docker ps -a
4. Find the postgres:latest container ID.
5. terminal2: docker exec -it (container ID) bash
6. terminal2: psql -U postgres
7. terminal2: CREATE DATABASE zdb;
8. terminal3: cd into back-end
9. terminal3: npm install
10. terminal3: npm run migrate
11. terminal3: npm run seed
12. terminal4: cd into front-end/inventory-manager
13. terminal4: npm install
14. terminal4: npm start

Teardown:
1. terminal1: CTRL+C
2. terminal1: docker compose down
3. terminal4: CTRL+C

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