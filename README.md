# Orbitly Studio — Craft-Driven Digital Product Studio

![Orbitly Studio](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

A high-end, craft-driven full-stack web platform and Content Management System (CMS) built for **Orbitly Studio**, a boutique digital design and product agency.

---

## 🌟 Features

- **Craft-Driven Agency Homepage**: Hero showcase, Services breakdown, Dynamic Client Case Studies, Dynamic Blog Articles, Client Endorsements, and Interactive Contact CTA.
- **Dynamic Projects & Case Studies**: Interactive project cards powered by REST APIs, routing to dedicated full-page case studies (`/projects/:slug`).
- **Dynamic Editorial Blog**: High-conversion blog feed (`/blog/:slug`) supporting rich text and Markdown rendering with featured article highlights.
- **Strict Role-Based Security & Draft Protection**:
  - **Public (Unauthenticated)**: Strictly read-only. Database queries enforce `{ status: 'published' }` for projects and blogs. Draft content is **never** accessible or exposed through public APIs or direct URL parameters.
  - **Admin (Authenticated)**: Full CRUD capability over projects and blogs with live draft/publish toggles and featured flags.
- **Robust Security Stack**:
  - **JWT Authentication & Authorization**: Validates token presence, user existence, and verifies `user.role === 'admin'`. Non-admins receive `403 Forbidden`.
  - **Payload Validation**: Strict Zod schemas validating request bodies on all write endpoints. Returns formatted `400 Bad Request` responses on error.
  - **Rate Limiting**: `express-rate-limit` protection on `/api/auth/login` and sensitive admin write endpoints.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Glassmorphism & Micro-animations
- **Routing**: React Router v6
- **HTTP Client**: Axios with request interceptors for automatic JWT injection
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **Validation**: Zod
- **Rate Limiting**: `express-rate-limit`
- **CORS & Environment**: `cors` + `dotenv`

---

## 📁 Folder Structure

```text
orbitly-studio/
│
├── client/                     # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProtectedRoute, MarkdownRenderer
│   │   ├── pages/              # Home, ProjectDetail, BlogDetail, AdminLogin, AdminDashboard
│   │   ├── services/           # Centralized Axios API Service (api.ts)
│   │   ├── types/              # TypeScript Interfaces & API Schemas
│   │   ├── App.tsx             # React Router Setup & Main Layout
│   │   ├── main.tsx            # Entry Point
│   │   └── index.css           # Tailwind & Custom Styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js + Express + MongoDB Backend
│   ├── src/
│   │   ├── config/             # Database connection (db.ts)
│   │   ├── controllers/        # Auth, Project, and Blog controllers
│   │   ├── middleware/         # Auth, Rate Limiter, Validation, Error Handler
│   │   ├── models/             # Mongoose schemas (User, Project, Blog)
│   │   ├── routes/             # Auth, Public, and Admin REST routes
│   │   ├── seed/               # Database seed script (seed.ts)
│   │   ├── validation/         # Zod schemas (schemas.ts)
│   │   └── server.ts           # Express App Server Entry point
│   ├── tsconfig.json
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/orbitly-studio
JWT_SECRET=orbitly_studio_super_secret_jwt_key_2026_change_in_prod
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` OR a cloud MongoDB Atlas connection URI.

### 2. Backend Setup & Seeding

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Build TypeScript
npm run build

# Seed database (Creates admin user + 4 published projects + 1 draft project + 4 published blogs + 1 draft blog)
npm run seed

# Start server in development mode
npm run dev
```

The Express API server will start on **`http://localhost:5000`**.

### 3. Frontend Setup

```bash
# In a new terminal window, navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

The Vite frontend server will start on **`http://localhost:3000`**.

---

## 🔐 Local Admin Testing Credentials

| Credential | Value |
| :--- | :--- |
| **Login URL** | `/admin/login` |
| **Email** | `admin@orbitly.studio` |
| **Password** | `Admin@123` |
| **Role** | `admin` |

---

## 📡 API Endpoint Reference

### Auth Endpoints
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public (Rate Limited) | Authenticate admin user & receive JWT |
| `GET` | `/api/auth/me` | Protected | Fetch currently logged-in user profile |

### Public Content Endpoints (Strict `{ status: 'published' }` Query Filter)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Public | List all published projects |
| `GET` | `/api/projects/:slug` | Public | Get single published project by slug |
| `GET` | `/api/blogs` | Public | List all published blogs (featured first) |
| `GET` | `/api/blogs/:slug` | Public | Get single published blog post by slug |
| `GET` | `/api/health` | Public | API Health check status |

### Admin Management Endpoints (Requires valid JWT & `role === 'admin'`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/projects` | Admin | List all projects (published + draft) |
| `POST` | `/api/admin/projects` | Admin (Zod + Rate Limited) | Create new project |
| `PUT` | `/api/admin/projects/:id` | Admin (Zod + Rate Limited) | Update existing project |
| `DELETE` | `/api/admin/projects/:id` | Admin (Rate Limited) | Delete project |
| `GET` | `/api/admin/blogs` | Admin | List all blog articles (published + draft) |
| `POST` | `/api/admin/blogs` | Admin (Zod + Rate Limited) | Create new blog article |
| `PUT` | `/api/admin/blogs/:id` | Admin (Zod + Rate Limited) | Update existing blog article |
| `DELETE` | `/api/admin/blogs/:id` | Admin (Rate Limited) | Delete blog article |

---

## 🛡️ Security Features & Implementation Details

1. **Database-Level Draft Protection**:
   `getPublicProjects` and `getPublicBlogs` controllers explicitly pass `{ status: 'published' }` in Mongoose `find()` queries. Draft items are never returned to client requests or exposed via search engine crawlers.
2. **Double-Layered Admin Guard**:
   `authenticateJWT` verifies token validity and database user record existence. `requireAdmin` checks `req.user.role === 'admin'`, returning `403 Forbidden` for non-admin accounts.
3. **Robust Input Validation**:
   Zod schemas validate all body parameters before execution, returning structured JSON error objects.

---

&copy; 2026 Orbitly Studio. All rights reserved.
