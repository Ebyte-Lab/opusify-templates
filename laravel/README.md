# 🚀 Laravel High-Performance Starter Template

A clean, production-ready, highly scannable Laravel 11 architecture designed to maximize development velocity and eliminate boilerplate friction.

> **Stack:** PHP 8.2+ · Laravel 11 · Laravel Sanctum · SQLite / MySQL · PHPUnit

---

## 🛠️ Features & Architecture

| Feature | Detail |
| :--- | :--- |
| **API First** | Pre-configured RESTful wrappers with robust `ApiController` JSON envelopes |
| **Sanctum Auth** | Token issuance, guard protection, and revocation out-of-the-box |
| **Repository/Service Pattern** | Clean separation between DB access, business logic, and HTTP controllers |
| **Global JSON Exceptions** | Every HTTP error (401, 404, 405, 422, 5xx) returns a clean JSON envelope — never an HTML trace |
| **Interactive API Explorer** | Built-in browser UI at `/explorer` to test all endpoints without external tools |
| **Isolated Environment Layer** | Strict `.gitignore` rules protecting secrets, caches, and vendor files |
| **Testing Matrix** | Feature & Unit test suites pre-configured with in-memory SQLite |
| **Database Seeding** | 30 factory-generated items + demo users ready instantly |

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
```bash
cd laravel
composer install
```

### 2. Configure Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Initialize Database & Seed
The template defaults to a local SQLite database — no MySQL setup required to get started:
```bash
# Create the SQLite file
touch database/database.sqlite

# Run all migrations and seed 30 demo items + users
php artisan migrate --seed
```

> To switch to MySQL, update `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in your `.env` file, then re-run `php artisan migrate --seed`.

### 4. Start the Development Server
```bash
php artisan serve
```
Application is now running at: **`http://127.0.0.1:8000`**

---

## 🧭 Interactive API Explorer

This template ships with a built-in browser-based API Explorer — no Postman or Insomnia required.

```
http://127.0.0.1:8000/explorer
```

### What it does:
- **Register or login** directly from the browser UI
- **Auto-captures the Bearer token** and injects it into all subsequent protected requests
- **Syntax-highlighted JSON** responses with HTTP status badges and response timing
- **All 9 endpoints** listed with labelled input fields — public and protected

> 💡 **Always use `/explorer` to test endpoints.** Typing API URLs like `/api/items` directly into the browser address bar issues a `GET` request which will return a `405 Method Not Allowed` JSON error for POST-only routes.

---

## 🧪 Running Tests

The test suite uses an isolated in-memory SQLite database (`:memory:`) — your local development data is never touched.

```bash
# Using Laravel Artisan (recommended)
php artisan test

# Using PHPUnit directly
./vendor/bin/phpunit
```

### Test Coverage

| Suite | Test | Covers |
| :--- | :--- | :--- |
| **Feature** | `HealthCheckTest` | `/` root endpoint → `200 OK` · `/up` health check |
| **Feature** | `AuthenticationTest` | Unauthenticated `401` guard · Registration `201` · Login `200` · Invalid credentials `401` · Sanctum `actingAs` token |
| **Unit** | `DatabaseLayerTest` | User factory hydration · Item factory hydration · SKU uniqueness constraint enforcement |

---

## 📂 Architecture Breakdown

```
laravel/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── ApiController.php      ← Standardized JSON response envelope base class
│   │           ├── AuthController.php     ← Register, login, logout, token issuance (Sanctum)
│   │           └── ItemController.php     ← RESTful CRUD resource handler
│   ├── Models/
│   │   ├── User.php                       ← User entity (HasApiTokens, HasFactory)
│   │   └── Item.php                       ← Transactional item entity
│   ├── Providers/
│   │   └── AppServiceProvider.php         ← Repository interface → Eloquent implementation binding
│   ├── Repositories/
│   │   ├── ItemRepositoryInterface.php    ← Data access contract (CRUD signatures)
│   │   └── EloquentItemRepository.php     ← Eloquent ORM implementation
│   └── Services/
│       └── ItemService.php                ← Business logic orchestration + logging
├── bootstrap/
│   ├── app.php                            ← Routing, Sanctum middleware, global JSON exception handlers
│   ├── cache/                             ← Auto-generated package cache (git-tracked, contents ignored)
│   └── providers.php                      ← Service provider registry
├── config/
│   ├── database.php                       ← SQLite + MySQL connection configuration
│   ├── sanctum.php                        ← Stateful domains, token expiry, guards
│   └── cors.php                           ← CORS allowed origins and headers
├── database/
│   ├── factories/
│   │   ├── UserFactory.php                ← Fake user generator
│   │   └── ItemFactory.php                ← Fake item generator (name, SKU, price, quantity)
│   ├── migrations/
│   │   ├── ..._create_users_table.php
│   │   ├── ..._create_personal_access_tokens_table.php
│   │   └── ..._create_items_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php             ← Master seeder (calls ItemSeeder)
│       └── ItemSeeder.php                 ← Seeds 30 dummy transactional items
├── public/
│   ├── index.php                          ← Front-controller entry point
│   ├── .htaccess                          ← Apache URL rewriting rules
│   └── api-explorer.html                  ← Interactive browser API Explorer UI
├── routes/
│   ├── api.php                            ← All API routes (public + Sanctum-protected)
│   ├── web.php                            ← Root JSON response + /explorer route
│   └── console.php                        ← Custom Artisan command definitions
├── storage/
│   └── framework/
│       ├── cache/data/                    ← App cache (git-tracked, contents ignored)
│       ├── sessions/                      ← Session files (git-tracked, contents ignored)
│       ├── testing/                       ← Test artifacts (git-tracked, contents ignored)
│       └── views/                         ← Compiled Blade views (git-tracked, contents ignored)
├── tests/
│   ├── Feature/
│   │   ├── HealthCheckTest.php
│   │   └── AuthenticationTest.php
│   └── Unit/
│       └── DatabaseLayerTest.php
├── .env.example                           ← Complete environment template (copy to .env)
├── .gitignore                             ← Strict rules blocking secrets, caches, and vendor files
├── artisan                                ← CLI entry point (chmod +x)
├── composer.json                          ← PHP 8.2+ / Laravel 11 / Sanctum dependencies
└── phpunit.xml                            ← PHPUnit config with in-memory SQLite test environment
```

---

## 📡 REST API Reference

All responses follow a **standardized JSON envelope**:

### ✅ Success Response
```json
{
  "success": true,
  "data": { "id": 1, "name": "Wireless Keyboard", "sku": "KB-001" },
  "message": "Item created successfully"
}
```

### 📄 Paginated Response
```json
{
  "success": true,
  "data": [ { "id": 1, "name": "Item A" } ],
  "message": "Items list retrieved successfully",
  "meta": {
    "pagination": {
      "total": 30,
      "count": 15,
      "per_page": 15,
      "current_page": 1,
      "total_pages": 2
    }
  }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "HTTP method not allowed for this route.",
  "allowed_methods": ["POST"],
  "tip": "Use the API Explorer at /explorer to interact with all endpoints correctly."
}
```

### Endpoints

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Health check — returns framework status |
| `GET` | `/up` | No | Laravel built-in uptime check |
| `GET` | `/explorer` | No | **Interactive API Explorer browser UI** |
| `GET` | `/api/demo-items` | No | Public paginated items list (great for quick browser testing) |
| `POST` | `/api/register` | No | Register a new user — returns Bearer token |
| `POST` | `/api/login` | No | Authenticate — returns Bearer token |
| `GET` | `/api/me` | 🔒 Sanctum | Get authenticated user profile |
| `POST` | `/api/logout` | 🔒 Sanctum | Revoke current Bearer token |
| `GET` | `/api/items` | 🔒 Sanctum | Paginated items list (`?page=1&per_page=15`) |
| `POST` | `/api/items` | 🔒 Sanctum | Create a new item |
| `GET` | `/api/items/{id}` | 🔒 Sanctum | Get a single item by ID |
| `PUT` | `/api/items/{id}` | 🔒 Sanctum | Update an existing item |
| `DELETE` | `/api/items/{id}` | 🔒 Sanctum | Delete an item |

---

## 🔐 Authentication Flow

```
POST /api/register  ─── name, email, password ──► { access_token: "..." }
                                                              │
POST /api/login     ─── email, password ────────► { access_token: "..." }
                                                              │
                              ┌───────────────────────────────┘
                              ▼
Authorization: Bearer <token>  ──► GET /api/me, /api/items, etc.
                              │
POST /api/logout ─────────────┘ (revokes token)
```

---

## 🌍 Environment Reference

| Variable | Default | Description |
| :--- | :--- | :--- |
| `APP_KEY` | *(generated)* | Application encryption key — run `php artisan key:generate` |
| `APP_ENV` | `local` | Application environment (`local`, `production`) |
| `APP_DEBUG` | `true` | Show detailed errors in development |
| `DB_CONNECTION` | `sqlite` | Database driver (`sqlite`, `mysql`) |
| `DB_DATABASE` | `database/database.sqlite` | SQLite path or MySQL database name |
| `CACHE_STORE` | `database` | Cache driver (`database`, `redis`, `array`) |
| `SESSION_DRIVER` | `database` | Session driver (`database`, `redis`, `array`) |
| `SANCTUM_STATEFUL_DOMAINS` | `localhost:3000` | Comma-separated SPA domains for cookie-based auth |

---

## 🔧 Useful Artisan Commands

```bash
# Fresh database wipe + re-migrate + re-seed
php artisan migrate:fresh --seed

# List all registered routes
php artisan route:list

# Clear all application caches
php artisan optimize:clear

# Run tests with verbose output
php artisan test --verbose

# Generate a new model with migration and factory
php artisan make:model Product -mf
```

---

## 📦 Tech Stack

| Layer | Technology |
| :--- | :--- |
| Language | PHP 8.2+ |
| Framework | Laravel 11.x |
| Authentication | Laravel Sanctum 4.x |
| Database | SQLite (default) · MySQL (configurable) |
| Testing | PHPUnit 10.x |
| Code Style | Laravel Pint |
| Mocking | Mockery |
| Dev Tools | Faker · Laravel Tinker · Collision |
