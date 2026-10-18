//server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
app.use(express.json());

app.use(cors({  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.FRONTEND_URL,
  ].filter(Boolean),}));

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT 
});


 // Get all todos
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, results) => {
    if (err) { console.error('MySQL Error Details:', err); return res.status(500).json(err);} 
    res.json({ id: results.insertId, task, completed: false });
  });
});

// UPDATE: Edit or mark a todo as completed
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Todo updated successfully' });
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Todo deleted successfully' });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * 
 * // Get all todos
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, results) => {
    if (err) { console.error('MySQL Error Details:', err); return res.status(500).json(err);} 
    res.json({ id: results.insertId, task, completed: false });
  });
});

// UPDATE: Edit or mark a todo as completed
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Todo updated successfully' });
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Todo deleted successfully' });
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 * 
 * 
 * 
 */