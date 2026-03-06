# Task Tracker Backend API

This project is a backend system that allows users to register, login, and manage their tasks.

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT Authentication
* Jest & Supertest for testing

## Setup Instructions

Clone the repository

git clone https://github.com/sinchanahegde714/task-tracker-backend.git

cd task-tracker-backend

Install dependencies

npm install

Create a `.env` file

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
PORT=5000

Run the server

npm run dev

## Run Tests

npm test

## API Endpoints

### Authentication

POST /auth/register
POST /auth/login

### Tasks

POST /tasks
GET /tasks
PUT /tasks/:id
DELETE /tasks/:id

### Admin

GET /admin/users
DELETE /admin/users/:id

## Security Features

* Password hashing with bcrypt
* JWT authentication
* Role-based access control
* Environment variables for secrets
