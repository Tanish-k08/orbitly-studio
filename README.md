# orbitly-studio
A full-stack web platform and content management system for **Orbitly Studio**, a boutique digital design and product agency. Built with TypeScript across the entire stack.

---

## Features

- **Landing Page**: Minimalist, craft-driven agency showcase featuring Hero, About/Services, Dynamic Projects, Dynamic Blog, Testimonials, and Contact sections.
- **Dynamic Projects**: Client case studies detailing problems, solutions, and outcomes.
- **Dynamic Blog**: Thought-leadership posts with rich-text/Markdown content, featured post highlighting, and dynamic routing (`/blog/:slug`).
- **Role-Based Access Control (RBAC)**:
  - **Public / Unauthenticated**: Strict read-only access. Only returns `published` content.
  - **Admin**: Authenticated access with full CRUD capabilities over projects and blog posts, including draft/publish toggling.
- **Security & Validation**: Request payload validation (Zod/Joi) and rate limiting on sensitive routes (authentication & write operations).

---

## Tech Stack

- **Frontend**: React / Next.js, TypeScript, Tailwind CSS (or your choice of styling)
- **Backend**: Node.js, Express / NestJS, TypeScript
- **Database / ORM**: PostgreSQL / MongoDB with Prisma / Mongoose
- **Validation & Security**: Zod / Joi, `express-rate-limit`, JWT authentication

---

## Project Structure

```text
orbitly-studio/
├── client/              # Frontend application
└── server/              # Backend REST API
