const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

// Config mínima (sin .env para el taller)
const PORT = 3000;
const JWT_SECRET = 'dev-secret-change-me';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// PostgreSQL local (ajusta según tu instalación)
// Sugerido: crear BD `courses_db` y ejecutar db/init.sql + db/seed.sql
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'courses_db'
});

app.use(cors());
app.use(express.json());

function signAdminToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || payload.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

function toCourseRow(body) {
  const {
    img,
    title,
    subtitle,
    description,
    price,
    tag,
    duration = null,
    instructor = null,
    schedule = null,
    active = true
  } = body || {};

  return {
    img,
    title,
    subtitle,
    description,
    price,
    tag,
    duration,
    instructor,
    schedule,
    active
  };
}

function validateCourseInput(course) {
  const required = ['img', 'title', 'subtitle', 'description', 'price', 'tag'];
  const missing = required.filter((k) => course[k] === undefined || course[k] === null || course[k] === '');
  if (missing.length) return `Faltan campos: ${missing.join(', ')}`;

  const priceNum = Number(course.price);
  if (!Number.isFinite(priceNum) || priceNum < 0) return 'El precio debe ser un número válido >= 0';

  if (course.active !== undefined && typeof course.active !== 'boolean') return 'El campo active debe ser boolean';

  return null;
}

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1 as ok');
    return res.json({ ok: true });
  } catch (e) {
    return res.status(503).json({ ok: false, message: 'DB no disponible' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  return res.json({ token: signAdminToken() });
});

// Público por defecto: active=true
app.get('/courses', async (req, res) => {
  const activeParam = (req.query.active ?? 'true').toString();
  const activeNormalized = activeParam.toLowerCase();

  const wantsAll = activeNormalized === 'all';
  const wantsActive = activeNormalized === 'true' || activeNormalized === '1';
  const wantsInactive = activeNormalized === 'false' || activeNormalized === '0';

  try {
    let result;
    if (wantsAll) {
      result = await pool.query('SELECT * FROM courses ORDER BY id ASC');
    } else if (wantsInactive) {
      result = await pool.query('SELECT * FROM courses WHERE active = false ORDER BY id ASC');
    } else if (wantsActive) {
      result = await pool.query('SELECT * FROM courses WHERE active = true ORDER BY id ASC');
    } else {
      return res.status(400).json({ message: "Query 'active' inválida (usa true/false/all)" });
    }
    return res.json(result.rows);
  } catch (e) {
    console.log('Error',e);
    return res.status(500).json({ message: 'Error al listar cursos' });
  }
});

app.get('/courses/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Curso no encontrado' });
    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({ message: 'Error al obtener curso' });
  }
});

app.post('/courses', requireAuth, async (req, res) => {
  const course = toCourseRow(req.body);
  const error = validateCourseInput(course);
  if (error) return res.status(400).json({ message: error });

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

app.put('/courses/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ message: 'ID inválido' });

  const course = toCourseRow(req.body);
  const error = validateCourseInput(course);
  if (error) return res.status(400).json({ message: error });

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

app.patch('/courses/:id/active', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ message: 'ID inválido' });

  const { active } = req.body || {};
  if (typeof active !== 'boolean') return res.status(400).json({ message: 'active debe ser boolean' });

  try {
    const result = await pool.query(
      `UPDATE courses
       SET active=$1, updated_at=NOW()
       WHERE id=$2
       RETURNING *`,
      [active, id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Curso no encontrado' });
    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({ message: 'Error al activar/desactivar curso' });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

