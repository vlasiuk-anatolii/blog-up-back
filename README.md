# 🧠 Blog-Up Backend

This is the backend part of a full-stack blog application built using **NestJS**, **PostgreSQL**, **TypeORM**, and **TypeScript**. It provides a RESTful API for managing blog posts, comments, and user authentication using JWT.

## 📽️ Demo

[Watch demo video](https://www.loom.com)

## 🚀 Features

* 📄 CRUD operations for posts
* 💬 Comments on posts
* 🔐 JWT-based authentication
* 📁 PostgreSQL integration via TypeORM
* 🛡️ Input validation with class-validator
* 🧩 Modular structure

## 🧰 Tech Stack

* **NestJS**
* **TypeScript**
* **TypeORM**
* **PostgreSQL**
* **Passport (Local & JWT)**
* **bcrypt**
* **Joi** for schema validation
* **WebSocket** for updating list of comments in realtime

## 📦 Installation

```bash
git clone https://github.com/vlasiuk-anatolii/blog-up-back
cd blog-up-back
npm install
npm run start:dev
```

The server will run at [http://localhost:3001](http://localhost:3001)

## ⚙️ Configuration

Create a `.env` file in the current directory with the following content:

```env
PORT="3001"

DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="1111"
DB_NAME="blog-up"
DB_SCHEMA="public"

JWT_SECRET="uWoYsHgYqqsCH4O11PgpuMQAWSRObk5T"
JWT_EXPIRATION="10h"

RECAPTCHA_PROJECT_ID=blog-up-*******
RECAPTCHA_SITE_KEY=6LfPM************************

GCP_CLIENT_EMAIL=recaptcha-client@blog-up-************.com
GCP_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMI*******0fY5A==\n-----END PRIVATE KEY-----\n
```

## 📁 Project Structure

```
back/
├── src/
│   ├── auth/            // Authentication module (JWT, local)
│   ├── comments/        // Comments module
│   ├── posts/           // Posts module
│   ├── config/          // Config file for Joi
│   ├── users/           // Users module
│   ├── recaptcha/       // Recaptcha module
│   ├── app.module.ts    // Main module
│   └── main.ts          // App entry point
├── .env                 // Environment variables
└── package.json         // Project metadata and scripts
```

## ✅ Implemented

* [x] API for posts (CRUD)
* [x] API for comments
* [x] Authentication (login, singup)
* [x] Environment-based config
* [x] Input validation
* [x] PostgreSQL DB setup

## ➕ Optional Enhancements

* [ ] Role-based access control
* [ ] Rate limiting
* [ ] Swagger documentation
* [ ] Unit & e2e tests coverage

## 📝 Notes

* The frontend should be configured to send requests to `http://localhost:3001`
* Make sure PostgreSQL is running and a database named `blog` is created

## 📄 License

MIT © 2025 [Anatolii Vlasiuk](https://github.com/vlasiuk-anatolii)
