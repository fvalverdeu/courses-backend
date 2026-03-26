-- Esquema mínimo para el taller (PostgreSQL)
-- BD sugerida: courses_db

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  img TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  tag TEXT NOT NULL,

  duration TEXT NULL,
  instructor TEXT NULL,
  schedule TEXT NULL,

  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(active);

