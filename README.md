# Automation Practice Portal

A modern, full-stack web portal for automation engineers to practice and learn automation concepts.  
Built with **React (Vite) + Bootstrap 5** on the frontend and **Node.js/Express + MongoDB (Mongoose)** on the backend.

---

## Project Folder Structure

```
practice-portal/
│
├── backend/                  # Node.js/Express backend API
│   ├── models/               # Mongoose data models (User, Notification)
│   │   ├── Notification.js
│   │   └── User.js
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js               # Script to seed test user and notifications
│   ├── server.js             # Main Express server
│   ├── .env                  # Environment variables (not committed)
│   └── .env.example          # Example env file
│
├── practice-portal/          # Frontend React app (Vite)
│   └── src/
│       ├── App.jsx           # Main app and router
│       ├── Footer.jsx        # Footer with LinkedIn and copyright
│       ├── ImageGallery.jsx  # Image gallery component
│       ├── Login.jsx         # Login page
│       ├── ProtectedRoute.jsx# Route protection logic
│       ├── Register.jsx      # Registration page
│       └── ...               # Other feature components
│
├── public/                   # Static assets (favicon, images, etc.)
│   └── vite.svg
│
├── node_modules/
├── package.json              # Project-level dependencies (frontend)
├── package-lock.json
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── .gitignore
├── index.html                # Main HTML entry point
└── README.md                 # Project documentation
```

---

## Framework & Design Overview

### **Frontend**
- **React (with Vite):** Fast, modern SPA framework for building UI.
- **Bootstrap 5:** For responsive, mobile-first, and beautiful UI components.
- **React Router:** For client-side routing and deep-linking to each feature.
- **Component-based structure:** Each automation practice feature (login, table, file upload, image gallery, etc.) is a separate React component.
- **ProtectedRoute:** Custom component to restrict access to authenticated users only.
- **Footer:** Persistent footer with LinkedIn profile and copyright.

### **Backend**
- **Node.js + Express:** REST API server.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JWT Authentication:** Secure login and protected API endpoints.
- **Endpoints:** `/api/login`, `/api/register`, `/api/profile`, `/api/notifications`, `/api/users` (dev only).
- **Seed script:** Quickly populate the database with a test user and notifications.

### **Fullstack Integration**
- **Frontend and backend are decoupled** but communicate via REST API.
- **MongoDB Atlas** is used for cloud database storage.
- **Environment variables** are used for sensitive config (MongoDB URI, JWT secret).

---

## How to Run

### **Frontend**
```sh
cd practice-portal/practice-portal
npm install
npm run dev
# Visit http://localhost:5173/
```

### **Backend**
```sh
cd practice-portal/backend
npm install
npm run seed   # (optional) Seed test user
npm run dev
# API runs at http://localhost:5000/
```

---

## Key Features

- **Authentication:** Login, registration, JWT-protected routes.
- **Modern UI:** Responsive layout, sidebar, navbar, and footer.
- **Practice Components:** Table, file upload, dropdowns, search, modal, calendar, drag & drop, API data, quiz, notifications, wizard, pagination, charts, rich text editor, image gallery, sortable list, tabs/accordion, stepper/progress, custom alerts, data grid, user profile, theme toggle, API auth demo, websocket demo, and more.
- **Navigation:** Each feature is accessible via a unique URL (e.g., `/image-gallery`, `/charts`), so refreshing the page keeps you on the same component.
- **Footer:** Includes your [LinkedIn profile](https://www.linkedin.com/in/guneetsinghbali/) and copyright.

---

## Example Route Structure

- `/login` — Login page
- `/register` — Registration page
- `/image-gallery` — Image Gallery
- `/charts` — Charts & Graphs
- `/table` — Data Table
- `/quiz` — Quiz
- `/api-data` — API Data Demo
- `/calendar` — Calendar
- `/` — Dashboard (default after login)
- ...and more

---

## Contribution & Version Control

- The project is under git version control and hosted at:  
  [https://github.com/dellstop123/AutomationPracticePortal](https://github.com/dellstop123/AutomationPracticePortal)
- To contribute, clone the repo, create a branch, and submit a pull request.

---

If you want to further expand this documentation, add usage examples, or API details, feel free to edit this file!
