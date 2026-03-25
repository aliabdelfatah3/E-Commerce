# 🛍️ HexaShop — Premium E-Commerce Platform

A full-stack e-commerce web application built with **React** on the frontend and **.NET 8** on the backend, featuring JWT authentication, product variant (size) selection, cart management, order tracking, and more.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7 |
| **State & Data** | TanStack React Query, Context API + useReducer |
| **Backend** | .NET 8 (ASP.NET Core Web API) |
| **Database** | SQLite via Entity Framework Core |
| **Auth** | JWT Bearer Tokens |
| **Email** | SMTP (Gmail App Password) |

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, Logout, Forgot/Reset Password via email
- 🛍️ **Product Catalog** — 100 seeded products with pagination, search, filtering & sorting
- 👗 **Size Variants** — Product size selection (S/M/L/XL), persisted in cart and orders
- 🛒 **Cart Management** — Add, remove, update quantities; synced with backend per user
- 💳 **Checkout** — Full checkout form with order creation and success state
- 📦 **Order History** — View past orders with per-item size labels
- 📍 **Order Tracking** — Visual 4-step progress tracker (Placed → Processing → Shipped → Delivered)
- 📱 **Responsive Design** — Full mobile support with hamburger drawer navigation
- ⚡ **Performance** — React.lazy code splitting, React.memo, image lazy loading, React Query caching

---

## 🏗️ Project Structure

```
Task-Advanced/
├── Frontend/          # React + Vite application
│   ├── src/
│   │   ├── pages/     # Route-level page components
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # Auth & Cart context providers
│   │   ├── services/  # Axios API layer
│   │   └── hooks/     # Custom React hooks
│   ├── .env           # Environment variables (not committed)
│   └── .env.example   # Template for environment variables
│
└── Backend/           # .NET 8 Web API
    ├── Controllers/   # API endpoints
    ├── Models/        # EF Core entity models
    ├── DTOs/          # Request/Response data transfer objects
    ├── Data/          # DbContext + DbInitializer (seeding)
    └── Migrations/    # EF Core migration files
```

---

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js 18+](https://nodejs.org/) + pnpm (`npm i -g pnpm`)
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [dotnet-ef CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

---

### Backend Setup

```bash
cd Backend

# Restore packages
dotnet restore

# Apply database migrations
dotnet-ef database update
# (or on Windows if PATH isn't set)
& "C:\Users\<YOU>\.dotnet\tools\dotnet-ef.exe" database update

# Run the API (port 8000)
dotnet run
```

> The database is automatically seeded with 100 products on first run.

---

### Frontend Setup

```bash
cd Frontend

# Install dependencies
pnpm install

# Copy env template
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL=http://localhost:8000/

# Start dev server (port 5173)
pnpm dev
```

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login, returns JWT token |
| POST | `/logout` | ❌ | Logout (client-side) |
| POST | `/forgot-password` | ❌ | Send reset email |
| POST | `/reset-password` | ❌ | Reset password with token |
| GET | `/products` | ❌ | List products (pagination, search, sort) |
| GET | `/products/{id}` | ❌ | Get single product |
| GET | `/products/category/{cat}` | ❌ | List by category |
| GET | `/cart` | ✅ | Get user's cart |
| POST | `/cart` | ✅ | Add item to cart |
| PUT | `/cart/{id}` | ✅ | Update cart item quantity |
| DELETE | `/cart/{id}` | ✅ | Remove cart item |
| DELETE | `/cart` | ✅ | Clear cart |
| GET | `/orders` | ✅ | Get user's orders |
| POST | `/orders` | ✅ | Create order from cart |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push `Frontend/` to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Set environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com/`
4. Deploy

### Backend → Render / Azure / Railway

1. Set environment variables:
   - `ConnectionStrings__DefaultConnection` = path to persistent SQLite or connection string
   - `Jwt__Key` = strong random secret (32+ chars)
   - `CorsOrigins__0` = `https://your-frontend.vercel.app`
2. Build command: `dotnet publish -c Release -o out`
3. Start command: `dotnet out/ECommerce.API.dll`

---

## 🔑 Environment Variables

### Frontend (`.env`)
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL (include trailing slash) |

### Backend (`appsettings.json` / env vars)
| Key | Description |
|---|---|
| `ConnectionStrings:DefaultConnection` | SQLite connection string |
| `Jwt:Key` | JWT signing secret (min 32 chars) |
| `CorsOrigins` | Array of allowed frontend origins |
| `EmailSettings:SenderEmail` | Gmail address for password reset |
| `EmailSettings:AppPassword` | Gmail App Password for SMTP |

---

## 📄 License

This project is built for educational and portfolio purposes.

---

<p align="center">Built with ❤️ by <strong>Ali Abd El-Fattah</strong></p>
