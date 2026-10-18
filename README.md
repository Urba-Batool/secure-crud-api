# Secure RESTful CRUD API

A secured Node.js, Express, and MySQL API for managing student records. It provides authentication, role-based access control, validation, and protected CRUD endpoints.

## Requirements

- Node.js 18 or later
- MySQL or MariaDB running locally

## Installation and configuration

```bash
npm install
copy .env.example .env
```

Update `.env` with your MySQL credentials and a long random `JWT_SECRET`. Import `database.sql` in MySQL Workbench, or run it from a MySQL client. The script creates the `secure_crud_api` database, `users` table, and `students` table. `students.created_by` is a foreign key to `users.id`.

Test the database connection and start the application:

```bash
node test-db.js
npm start
```

The health endpoint is `GET http://localhost:5000/api/v1/health`.

## Authentication and roles

Register with `POST /api/v1/auth/register` using `name`, `email`, and a password of at least eight characters. Log in with `POST /api/v1/auth/login` to receive a JWT. Send it on protected requests:

```text
Authorization: Bearer <token>
```

New accounts have the `USER` role. Create an administrator with `node src/createAdmin.js` only after setting `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env`.

## API endpoints

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | Register a user |
| POST | `/api/v1/auth/login` | Public | Log in and receive a JWT |
| GET | `/api/v1/health` | Public | Service health check |
| GET | `/api/v1/students` | User or Admin | List students; accepts `page`, `limit`, and `search` |
| GET | `/api/v1/students/:id` | User or Admin | Get one student |
| POST | `/api/v1/students` | Admin | Create a student |
| PUT | `/api/v1/students/:id` | Admin | Update one or more student fields |
| DELETE | `/api/v1/students/:id` | Admin | Delete a student |

Student create/update bodies validate `name`, `email`, `age` (16–100), `department`, and `semester` (1–8). IDs are required to be positive integers.

## Security controls

- Passwords are hashed with bcrypt.
- JWT authentication and role-based authorization protect student data.
- Zod validates request data before it reaches controllers.
- All database queries use parameterized values.
- Helmet applies HTTP security headers; CORS restricts browser origins; API and login requests are rate limited.
- `.env` is ignored by Git and `.env.example` contains no live credentials.

## Testing checklist

Use Postman to verify registration, login, validation errors, unauthorized requests, each CRUD operation, duplicate emails, and pagination/search. Keep the exported Postman collection or screenshots with your submission as evidence.
