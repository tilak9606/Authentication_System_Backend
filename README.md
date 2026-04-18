# Authentication System Backend

Node.js + Express backend for user authentication with MongoDB, JWT-based auth, email verification, and password reset flows.

## Features

- User registration and login
- Access token + refresh token flow
- Email verification
- Forgot/reset password
- Protected profile endpoint (`/me`)
- Request validation with Joi

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Email sending (`nodemailer`)

## Project Structure

```text
server.js
src/
  app.js
  common/
    config/
    dto/
    middleware/
    utils/
  modules/
    auth/
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or remote)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/authentication_system

JWT_ACCESS_SECRET=your-access-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

NODE_ENV=development

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_NAME=Authentication System
SMTP_FROM_EMAIL=no-reply@example.com

CLIENT_URL=http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # start with nodemon
npm start        # start with node
npm run db:up    # start docker compose services
npm run db:down  # stop docker compose services
```

## Running the App

Development:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Base URL:

```text
http://localhost:5000/api/auth
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register user and send verification email | No |
| POST | `/login` | Login and set refresh token cookie | No |
| POST | `/refresh-token` | Get new access token using refresh token cookie | No |
| POST | `/logout` | Logout current user | Yes |
| GET | `/verifyemail/:token` | Verify email with token | No |
| POST | `/forgot-password` | Send password reset email | No |
| PUT | `/reset-password/:token` | Reset password with token | No |
| GET | `/me` | Get current user profile | Yes |

## Auth Details

- Send access token in header:

```http
Authorization: Bearer <access_token>
```

- Refresh token is stored in an HTTP-only cookie named `refreshToken`.

## Notes

- Ensure SMTP credentials are valid for email verification and password reset flows.
- MongoDB connection string is read from `MONGODB_URI`.
