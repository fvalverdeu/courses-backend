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

app.get('/', (req, res) => {
  res.json({ message: 'API de cursos en Express' });
});

// signAdminToken
function signAdminToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
}

// Endpoint /login POST
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  return res.json({ token: signAdminToken() });
});


// Endpoint /courses GET
app.get('/courses', async (req, res) => {
  let result;
  result = await pool.query('SELECT * FROM courses');
  return res.json(result.rows);
});


// Endpoint /courses/:id GET
app.get('/courses/:id', async (req, res) => {
  const id = Number(req.params.id);
  let result;
  result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
  return res.json(result.rows[0]);
});


// Endpoint /courses POST
app.post('/courses', async (req, res) => {
  const course = req.body || {};
    try {
      const result = await pool.query(
      `INSERT INTO courses (img, title, subtitle, description, price, tag, duration, instructor, schedule, active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        course.img,
        course.title,
        course.subtitle,
        course.description,
        Number(course.price),
        course.tag,
        course.duration,
        course.instructor,
        course.schedule,
        course.active
      ]
    );
    return res.status(201).json(result.rows[0]);
  } catch {
    return res.status(500).json({ message: 'Error al crear curso' });
  }
});

// Endpoint /courses/:id PUT
app.put('/courses/:id', async (req, res) => {
const id = Number(req.params.id);
  const course = req.body || {};
  
  try {
    const result = await pool.query(
      `UPDATE courses
       SET img=$1, title=$2, subtitle=$3, description=$4, price=$5, tag=$6,
           duration=$7, instructor=$8, schedule=$9, active=$10, updated_at=NOW()
       WHERE id=$11
       RETURNING *`,
      [
        course.img,
        course.title,
        course.subtitle,
        course.description,
        Number(course.price),
        course.tag,
        course.duration,
        course.instructor,
        course.schedule,
        course.active,
        id
      ]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Curso no encontrado' });
    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({ message: 'Error al editar curso' });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

