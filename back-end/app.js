const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development'])
const PORT = 8080;

app.use(cors(), express.json());

// create an account (done)
app.post('/signup', (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    bcrypt.hash(password, 10)
        .then(encryptedPass => {
        return knex('users')
            .insert({ first_name, last_name, username, password: encryptedPass })
        })
            .then(posted => {
                if (posted) res.status(201).json({ first_name, last_name, username, password })
            })
})

// log in account (done)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    knex('users')
        .where('username', username)
        .then(user => {
            if (user.length === 0) res.status(404).send('Incorrect credentials.')
            else {
                let isEqual = bcrypt.compare(password, user[0].password)
                if (isEqual) res.status(200).send('Login successful. Redirecting to your inventory....');
                else res.status(404).send('Incorrect credentials. Please try again.');
            }
        })
})

// redirected after logging in (done)
app.get('/user/:username/inventory/', (req, res) => {
    const { username } = req.params;
    knex('items')
        .select('item_name', 'description', 'quantity')
        .join('users', 'items.user_id', '=', 'users.id')
        .where('users.username', username)
        .then(itemData => res.status(200).json(itemData))
        .catch(err => res.status(500).send(err))
})

// add new item and then redirect to inventory (done)
app.post('/user/:username/inventory/new', (req, res) => {
    const { username } = req.params;
    const { item_name, description, quantity } = req.body;
    let user_id = knex('users')
        .select('id')
        .where('users.username', username)
    knex('items')
        .insert({ user_id, item_name, description, quantity })
        .then(() => {
            res.status(201).json({ item_name, description, quantity })
        })
        .catch(err => res.status(500).send(err));
})

// get all inventory, with descriptions cutting off at 100 chars (done)
app.get('/user/:user_id/inventory/all', (req, res) => {
    const { user_id } = req.params;

    knex('items')
        .select('item_name', 'description', 'quantity')
        .then(itemData => res.status(200).json(itemData))
        .catch(err => res.status(500).send(err))
})

// edit an item (done)
app.patch('/inventory/edit/:itemName', (req, res) => {
    const { itemName } = req.params;
    const { item_name, description, quantity } = req.body;
    let updates = {};
    if (item_name) updates.item_name = item_name;
    if (description) updates.description = description;
    if (quantity) updates.quantity = quantity;
    knex('items')
        .where('item_name', itemName)
        .first()
        .update(updates)
        .then(() => res.status(201).send(`Item ${item_name} updated successfully.`))
        .catch(err => res.status(500).send(err));
})

// delete an item (done)
app.delete('/inventory/delete/:item_name', (req, res) => {
    const { item_name } = req.params;
    knex('items')
        .where('item_name', item_name)
        .del()
        .then(deleted => {
            if (deleted) res.status(202).json(`Item ${item_name} deleted.`)
            else res.status(404).json(`Item ${item_name} not found.`)
        })
})

// visitor views all inventory items (done)
app.get('/inventory/', (req, res) => {
    knex('items')
        .select('item_name', 'description', 'quantity')
        .then(itemData => res.status(200).json(itemData))
        .catch(err => res.status(500).send(err))
})

// visitor views a specific item created by any user
app.get('/inventory/item/:item_name', (req, res) => {
    const { item_name } = req.params;
    knex('items')
        .select('item_name', 'description', 'quantity')
        .where('item_name', item_name)
        .then(itemData => res.status(200).json(itemData))
        .catch(err => res.status(500).send(err))
})

// inventory manager view all items created by every inventory manager
app.get('/user/:user_id/inventory/all-managers', (req, res) => {
    const { user_id } = req.params;
    knex('items')
        .select('item_name', 'description', 'quantity')
        .then(itemData => res.status(200).json(itemData))
        .catch(err => res.status(500).send(err))
})
app.listen(PORT, (req, res) => console.log(`Express server is listening on ${PORT}.`))