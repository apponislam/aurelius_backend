# Aurelius Backend API

Aurelius Backend is a secure, modular, and high-performance authentication and user management service built with **Node.js**, **Express**, and **TypeScript**. It serves as the core identity and access management layer of the Aurelius platform.

---

## 🚀 Tech Stack & Core Libraries

- **Runtime & Language**: Node.js, TypeScript (ts-node-dev for development, tsc for compilation)
- **Framework**: Express.js
- **Database**: MongoDB (Object modeling via Mongoose)
- **Authentication & Security**: JSON Web Tokens (JWT), Bcrypt hashing, Route guarding
- **File Processing**: Multer (file uploads) & Sharp (image optimization/resizing)
- **Emailing**: Nodemailer (Verification & OTP delivery)
- **Validation**: Zod (strict schema validation)

---

## 📁 Project Structure

The codebase is structured following a **Modular Design Pattern**, ensuring that the authentication and user domain is self-contained.

```text
aurelius_backend/
├── src/
│   ├── app/
│   │   ├── config/                   # Global configuration & Redis settings
│   │   ├── middlewares/              # Express middlewares (auth, upload, validation)
│   │   ├── modules/                  # Modular domain-driven folders
│   │   │   └── auth/                 # Authentication & User Management
│   │   └── routes/                   # API Route Registry
│   ├── errors/                       # Global error handling utilities
│   ├── utils/                        # Shared utility helpers (JWT, email templates, responses)
│   ├── app.ts                        # Express App initialization
│   └── server.ts                     # Database connection & Server listener
├── public/                           # Static assets & public files
├── uploads/                          # User-uploaded profile images
├── .env.example                      # Environment variables template
├── package.json                      # NPM dependencies & scripts
└── tsconfig.json                     # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local database or MongoDB Atlas connection URI)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd aurelius_backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy the example environment file and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

---

## ⚙️ Environment Variables

Update the following keys in your `.env` file:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Running Environment | `development` / `production` |
| `PORT` | Listening Port | `5057` |
| `MONGODB_URL` | MongoDB Connection URI | `mongodb+srv://...` |
| `BCRYPT_SALT_ROUNDS` | Cost factor for password hashing | `12` |
| `CLIENT_URL` | Frontend client application URL | `http://localhost:3000` |
| `JWT_ACCESS_SECRET` | Secret key for signing Access Tokens | `your_access_secret` |
| `JWT_ACCESS_EXPIRE` | Expiry duration for Access Tokens | `30d` |
| `JWT_REFRESH_SECRET` | Secret key for signing Refresh Tokens | `your_refresh_secret` |
| `JWT_REFRESH_EXPIRE` | Expiry duration for Refresh Tokens | `365d` |
| `JWT_PASSWORD_RESET_SECRET`| Secret key for resetting passwords | `your_reset_secret` |
| `SMTP_HOST` | Email SMTP Server Host | `smtp.gmail.com` |
| `SMTP_PORT` | Email SMTP Server Port | `587` |
| `SMTP_USER` | Sender email address | `example@gmail.com` |
| `SMTP_PASS` | App password for Gmail/SMTP | `your_email_app_password` |
| `SUPERADMINEMAIL` | Default Super Admin email address | `admin@aurelius.com` |
| `SUPERADMINPASSWORD` | Default Super Admin password | `super_admin_pass` |

---

## 🏃 Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the server in development mode with auto-reload (using `ts-node-dev`) |
| `npm run build` | Compiles the TypeScript code to standard JavaScript in the `dist/` directory |
| `npm run start` | Runs the compiled JavaScript server in production mode |
| `npm run lint` | Lints the codebase using ESLint |
| `npm run lint:fix` | Automatically resolves autofixable linting issues |

---

## 🛰️ API Routes Reference

All API routes are prefixed with `/api/v1`.

### 🔑 Authentication & User Management (`/api/v1/auth`)

#### Public Routes:
* `POST /auth/register` - Register a new user with optional profile image upload
* `POST /auth/login` - Authenticate user & retrieve access and refresh tokens
* `GET /auth/verify-email` - Verify user email address
* `POST /auth/resend-verification` - Resend verification email
* `POST /auth/refresh-token` - Retrieve a new access token using a refresh token
* `POST /auth/forgot-password` - Request a password reset OTP
* `POST /auth/verify-otp` - Verify the password reset OTP
* `POST /auth/resend-otp` - Resend a password reset OTP
* `POST /auth/reset-password` - Reset password with a verified token
* `GET /auth/verify-new-email` - Verify a new email address update

#### Protected Routes:
* `GET /auth/me` - Get profile details of the currently authenticated user
* `POST /auth/logout` - Clear user session and logout
* `PATCH /auth/profile` - Update user profile information (including image upload)
* `PATCH /auth/location` - Update coordinates/location data
* `POST /auth/fcm-token` - Register or update a Firebase Cloud Messaging (FCM) token for push notifications
* `POST /auth/change-password` - Change the password of the logged-in user
* `POST /auth/update-email` - Request to update the account email address
* `POST /auth/resend-email-update` - Resend verification email for an email update

#### Admin-Only Routes:
* `POST /auth/set-password/:userId` - Force-set a password for a specific user

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
