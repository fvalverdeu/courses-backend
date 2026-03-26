# courses-backend

Backend mínimo para taller: Node.js + Express + PostgreSQL + JWT.

## Requisitos

- Node.js 18+
- PostgreSQL local

## Instalación

```bash
npm install
```

## Base de datos

1. Crear base:

```sql
CREATE DATABASE courses_db;
```

2. Ejecutar scripts:
- `db/init.sql`
- `db/seed.sql`

## Ejecutar API

```bash
npm start
```

API en `http://localhost:3000`.

## Credenciales demo

- usuario: `admin`
- password: `admin123`

## Endpoints

- `POST /login`
- `GET /courses` (solo activos)
- `GET /courses?active=all`
- `GET /courses/:id`
- `POST /courses` (auth)
- `PUT /courses/:id` (auth)
- `PATCH /courses/:id/active` (auth)
