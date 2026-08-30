const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Chinmay',
    password: 'REMOVED_PASSWORD',
    database: 'canteen'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Endpoint to fetch the menu
app.get('/api/menu', (req, res) => {
    db.query('SELECT * FROM menu', (err, results) => {
        if (err) {
            console.error('Error fetching menu:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Endpoint to add a menu item
app.post('/api/menu', (req, res) => {
    const { item_name, price, category } = req.body;

    const orderQuery = 'INSERT INTO menu (item_name, price, category) VALUES (?, ?, ?)';
    db.query(orderQuery, [item_name, price, category], (err) => {
        if (err) {
            console.error('Error inserting menu item:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Item added successfully' });
    });
});

// Endpoint to record payment
app.post('/api/payment', (req, res) => {
    console.log('Received payment request:', req.body);
    const { payment_method, amount } = req.body;

    if (!payment_method || !amount) {
        console.error('Missing payment details');
        return res.status(400).json({ message: 'Payment method and amount are required.' });
    }

    if (!['COD', 'UPI'].includes(payment_method)) {
        console.error('Invalid payment method:', payment_method);
        return res.status(400).json({ message: 'Invalid payment method. Must be either COD or UPI.' });
    }

    const payment_date = new Date();
    const sql = 'INSERT INTO payment_history (payment_date, payment_method, amount) VALUES (?, ?, ?)';

    db.query(sql, [payment_date, payment_method, amount], (error) => {
        if (error) {
            console.error('Error inserting payment data:', error);
            return res.status(500).json({ message: 'Error inserting payment data', error: error.message });
        }

        res.status(200).json({ message: 'Payment recorded successfully' });
    });
});

// Endpoint to save order history
app.post('/api/order-history', (req, res) => {
    const { username, userId, items } = req.body; // Ensure userId is included

    const orderQueries = items.map(item => {
        const sql = 'INSERT INTO order_history (username, order_date, item_name, quantity, total_price, price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const totalPrice = parseFloat(item.totalPrice);
        return new Promise((resolve, reject) => {
            db.query(sql, [username, new Date(), item.itemName, item.quantity, totalPrice, item.price, userId], (error) => {
                if (error) {
                    console.error('Error inserting order history:', error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });

    Promise.all(orderQueries)
        .then(() => {
            res.status(200).json({ message: 'Order history recorded successfully' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error recording order history', error: err.message });
        });
});

// Endpoint to fetch order history based on username
app.get('/api/order-history/:username', (req, res) => {
    const username = req.params.username;
    db.query('SELECT * FROM order_history WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error fetching order history:', err);
            return res.status(500).json({ error: 'Error fetching order history' });
        }
        res.json(results);
    });
});

// Endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Error checking user' });
        }

        if (results.length > 0) {
            if (results[0].password === password) {
                // Assuming userId is available in the users table
                res.status(200).json({ message: 'Login successful', userId: results[0].id });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
