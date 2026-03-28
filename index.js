const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

const PORT = 3000;
const JWT_SECRET = 'dev-secret-change-me';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'courses_db'
});

app.use(cors());
app.use(express.json());

// signAdminToken


// Endpoint /login POST


// Endpoint /courses GET



// Endpoint /courses/:id GET
// app.get('/courses/:id', async (req, res) => {

// });


// Endpoint /courses POST
// app.post('/courses', async (req, res) => {
//   const course = req.body || {};

// });

// Endpoint /courses/:id PUT
// app.put('/courses/:id', async (req, res) => {
//   const course = req.body || {};
  
//   try {
    
//   } catch {
//     return res.status(500).json({ message: 'Error al editar curso' });
//   }
// });

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

