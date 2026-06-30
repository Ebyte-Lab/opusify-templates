# 🎨 Creative Workspace Dashboard

A production-grade, premium **React + TypeScript** application built with Vite and Tailwind CSS. This dashboard is designed to serve as a unified command center for creative agencies, design studios, and product teams to streamline projects, organize media assets, coordinate calendars, communicate internally, and analyze performance metrics.

---

## ✨ Features

The workspace is divided into 9 modular, fully typed feature views:

-   **📊 Dashboard**: A high-impact landing space featuring real-time KPI progress rings, active task checklists, critical notifications, and team activity feeds.
-   **📂 Project Management (`/projects`)**: Detailed project boards with drag-and-drop support, progress tracking, status tags, and a high-fidelity **Project Detail Page** to drill down into files, milestones, and task lists.
-   **🖼️ Digital Asset Library (`/assets`)**: Media manager with tag-filtering, categorization by file type (images, videos, docs), search functionality, and a React Dropzone uploader wrapper.
-   **👥 Team Directory (`/team`)**: Access management, presence states, member roles, and assignment statistics.
-   **📈 Analytics & Reports (`/analytics`)**: Interactive, custom charts (Recharts) displaying monthly revenue, team velocity, conversion funnels, and performance reporting.
-   **📅 Calendar & Events (`/calendar`)**: Interactive team scheduler, deadline organizer, and meeting planner.
-   **💬 Messaging Hub (`/messages`)**: Direct channels, real-time-styled chat inputs, active contact status toggles.
-   **🔔 Notifications panel (`/notifications`)**: Activity alerts, project updates, and system mentions.
-   **⚙️ Settings Control (`/settings`)**: Interface configurations, dark/light theme options, notification controls, and profile editing.

---

## 🛠️ Technology Stack

-   **Core**: React 18, TypeScript 5, Vite 6
-   **Styling & Motion**: Tailwind CSS v3, Framer Motion (for fluid micro-animations and modal transitions), Lucide React (icons)
-   **State Management & Data Flow**: 
    -   `Zustand` (for fast, lightweight, and predictable global store state)
    -   `TanStack React Query` (for asynchronous state cache management and query controls)
-   **Forms & Validation**: React Hook Form, Zod (schema validation), `@hookform/resolvers`
-   **File Management**: React Dropzone
-   **Date Utilities**: date-fns

---

## 📂 Project Architecture

```
creative_workspace_dashboard/
├── src/
│   ├── main.tsx                # Application bootstrap
│   ├── App.tsx                 # Core router and provider wrapper
│   │
│   ├── components/             # Reusable UI primitives
│   │   ├── layout/             # Sidebar, TopBar, AppShell layout wrappers
│   │   ├── shared/             # Search bars, Filter select menus
│   │   └── ui/                 # Buttons, Badges, Modals, Cards, Progress bars
│   │
│   ├── features/               # Domain-specific modules (Pages & Logic)
│   │   ├── analytics/
│   │   ├── assets/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── projects/
│   │   ├── settings/
│   │   └── team/
│   │
│   ├── hooks/                  # Custom global React hooks
│   ├── lib/                    # Configuration clients (QueryClient, Axios instances)
│   ├── stores/                 # Zustand global stores (theme, notifications, user)
│   ├── styles/                 # Global styles and font family configuration
│   └── types/                  # Shared TypeScript interfaces & definitions
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have Node.js (version 18 or above recommended) and npm installed.

### 🔧 Installation

1.  Navigate into the creative workspace folder:
    ```bash
    cd temp25d/creative_workspace_dashboard
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### 💻 Running Locally

Start the Vite development server:
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 📦 Production Build

Compile and bundle the project for production deployment:
```bash
npm run build
```
To preview the compiled production build locally:
```bash
npm run preview
```
