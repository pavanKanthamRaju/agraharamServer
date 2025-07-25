const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: '*', // Or your frontend URL like 'http://localhost:5173'
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}; 

app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 5000;

// 👇 Test the connection
pool.connect()
  .then(client => {
    console.log('✅ Database connected successfully!');
    client.release(); // release back to pool
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
  });
// Health check
app.get('/', (req, res) => res.send('API is running!'));

// Get all users
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// Add a new user
app.post('/users', async (req, res) => {
  console.log("api hit...")
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
