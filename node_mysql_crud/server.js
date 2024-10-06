const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shanu#hack5269@mar', // Your MySQL root password
  database: 'node_crud_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// adding roots for  each CRUD operation

// Get all users (Read)
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render('index', { users: result });
    });
  });
  
  // Add a user (Create)
  app.post('/add', (req, res) => {
    const {id, name, email, age } = req.body;
    const sql = 'INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)';
    db.query(sql, [id, name, email, age], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Edit user (Form)
  app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.render('edit', { user: result[0] });
    });
  });
  
  // Update user (Update)
  app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Delete user (Delete)
  app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  