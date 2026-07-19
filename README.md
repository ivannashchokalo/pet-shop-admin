# 🐾 Pet Shop Admin Panel

A modern administrative dashboard for managing the **Pet Shop** platform.

The Admin Panel is one of three applications that make up the complete **Pet Shop** ecosystem. Together, they provide a full-featured platform for browsing animals, processing reservation requests, and managing the entire system.

```text
                  🐾 Pet Shop Platform
                        │
        ┌───────────────┼───────────────┐
        │               │               │
🌐 Client App     🛠 Backend API      👑 Admin Panel
     Next.js         Node.js            React
      React          Express       React Router
```

The application provides administrators with a secure interface for managing animals, processing reservation requests, and monitoring platform activity. It communicates with the backend through a REST API, while all business logic, authentication, and data persistence are handled by the backend.

---

## 🔗 Related Repositories

- 🌐 **Client App**  
  Customer-facing web application where users can browse animals, manage favorites, and submit reservation requests.  
  🔗 https://github.com/ivannashchokalo/pet-shop-client

- ⚙️ **Backend API**  
  Backend service responsible for authentication, business logic, database operations, image uploads, and REST endpoints.  
  🔗 https://github.com/ivannashchokalo/pet-shop-api

---

> ⚠️ **Important**
>
> The Client and Admin Panel share the same authentication cookies.
> When testing both applications at the same time, use different browser windows (Incognito or another browser) to avoid cookie conflicts.

---


## 🎥 Demo

![Pet Shop Admin Demo](./screenshots/demo.gif)



---

## ✨ Features

### 🐾 Animal Management

Manage the entire animal catalog from a single interface.

- ➕ Create new animal profiles
- ✏️ Edit existing animal information
- 🗑️ Delete animals
- 👁️ View detailed animal information
- 🖼️ Upload and manage multiple images
- 🎞️ Browse images in a built-in gallery slider
- 🔄 Update reservation status directly from the details page

---

### 🔍 Search, Filtering & Navigation

Quickly find the animals you need.

- 🔎 Search by animal name or breed
- 🐶 Filter by animal type
- 📌 Filter by reservation status
- 📄 Server-side pagination
- ➕ Quick access to the **Create Animal** page

---

### 📋 Reservation Requests

Manage customer reservation requests from one place.

- 👤 View customer information
- 💬 Read customer messages
- 🔄 Update request status
  - New
  - Contacted
  - Closed
- 🔗 Open the requested animal directly from the request table
- 🗑️ Delete individual requests

---

### ⚡ Bulk Actions

Process multiple reservation requests simultaneously.

- 🗑️ Delete selected requests
- 📞 Mark selected requests as **Contacted**
- ✔️ Mark selected requests as **Closed**

---

### 📊 Dashboard

Monitor platform activity with interactive statistics and charts.

- 🐾 Animal overview
  - Total animals
  - Available animals
  - Reserved animals
  - Sold animals
- 🥧 Animal type distribution
- 📋 Reservation request overview
  - Total requests
  - New requests
  - Contacted requests
  - Closed requests
- 📈 Monthly reservation requests trend

---

### 🔐 Authentication

Secure administrator access.

- 🔒 Session-based authentication
- 🛡️ Protected routes
- ♻️ Automatic session renewal
- 🚪 Secure logout

---

### 🎨 User Experience

Designed to simplify everyday administration.

- 🌙 Dark mode
- 🔔 Toast notifications
- ✅ Form validation
- 🖼️ Image preview before upload
- 📱 Confirmation dialogs for destructive actions
- ⏳ Loading and empty states

---

## 🛠️ Tech Stack

### ⚛️ Core

- **React 19** — Building the user interface
- **TypeScript** — Static typing and improved developer experience
- **Vite** — Fast development server and optimized production builds

---

### 🧭 Routing

- **React Router** — Client-side routing and protected routes

---

### 📦 State Management & Server State

- **Redux Toolkit** — Global application state management
- **TanStack Query** — Server state management, caching, and asynchronous data fetching

---

### 🌐 API Communication

- **Axios** — HTTP client for communicating with the REST API

---

### 📝 Forms & Validation

- **React Hook Form** — Form state management
- **React Number Format** — Formatted numeric inputs
- **React DatePicker** — Date selection

---

### 🖼️ Media & UI Components

- **React Dropzone** — Drag & drop image uploads
- **Swiper** — Image gallery slider
- **React Select** — Custom select components
- **React Paginate** — Pagination
- **React Hot Toast** — Toast notifications

---

### 📊 Data Visualization

- **AG Charts** — Dashboard charts and analytics
- **AG Grid** — Interactive data tables

---

### 🎨 Styling

- **Sass (SCSS)** — Component styling
- **clsx** — Conditional class names
- **modern-normalize** — Cross-browser style normalization

---

### 🛠️ Development

- **ESLint** — Code quality and linting


---


## 📂 Project Structure

```text
src/
├── assets/
├── components/
├── constants/
├── pages/
├── providers/
├── services/
├── store/
├── styles/
├── types/
└── main.tsx
```

---

## 🔗 URL Search Params

The application keeps search filters, sorting, and pagination synchronized with the URL, allowing users to:

- 🔗 Share filtered pages via URL
- ↩️ Preserve state after page refresh
- ⬅️ Use browser back and forward navigation seamlessly
- 📄 Navigate directly to specific filtered views

---


## ⚙️ Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values if required.

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the Pet Shop Backend API. |


---


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ivannashchokalo/pet-shop-admin.git
cd animal-admin-panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔑 Admin Account

Use the following credentials to sign in to the Admin Panel:

- **Email:** `admin@gmail.com`
- **Password:** `adminadmin`


---


## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm run lint` | Runs ESLint to check code quality. |


---


## 🚀 Deployment

- 👑 **Admin Panel**  
  https://pet-shop-admin-taupe.vercel.app

- 🌐 **Client App**  
  https://pet-shop-client-five.vercel.app

- ⚙️ **Backend API**  
  https://pet-shop-api-tmbd.onrender.com


---


## 🔮 Future Improvements

- 👥 Role-based access control
- 📱 Responsive layout
- ⚙️ Settings page for configuring the client application


---

## 👩‍💻 Author

**Ivanna Shchokalo**  
Junior Full-Stack Developer

- 💼 LinkedIn: https://linkedin.com/in/ivannashchokalo
- 🌐 GitHub: https://github.com/ivannashchokalo