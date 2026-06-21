# Executive Education Dashboard

A production-grade, highly interactive single-page Learning Management System (LMS) dashboard designed for executive training, built with **React 18**, **TypeScript**, **Vite 8**, **Tailwind CSS v3**, **Zustand**, and **React Router v6**.

This project converts a static HTML design prototype into a modular, clean, and fully reactive application where routing, state, and interaction follow premium front-end best practices.

---

## 🚀 Technical Stack & Libraries

- **Framework**: React 18 (Strict Mode enabled)
- **Language**: TypeScript (Strict checks enabled)
- **Routing**: React Router v6 (for tab-based pages navigation)
- **State Management**: Zustand (for notifications, webinar registrations, cohort directories, courses, and user profiles)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Build Tool**: Vite 8 (optimized building and Fast Refresh)

---

## 📂 Project Architecture

```text
src/
├── components/          # Reusable UI Primitives & Layouts
│   ├── common/          # Global primitives (Avatar, SectionCard, ProgressTrack, etc.)
│   ├── layout/          # Page shells (AppHeader, TabNav, Footer, ToastViewport)
│   ├── overview/        # Dashboard-specific elements
│   ├── courses/         # Course grids and details
│   ├── certificates/    # Credential tables and rows
│   ├── network/         # Directory list items and search tools
│   └── profile/         # Edit profile forms and preference controls
├── data/                # Mock databases (fully decoupled from components)
│   ├── certificates.ts
│   ├── cohort.ts
│   ├── courses.ts
│   └── webinars.ts
├── hooks/               # Zustand Global State Stores & Custom Hooks
│   ├── useCourseStore.ts
│   ├── useDirectorySearch.ts
│   ├── useLayoutStore.ts
│   ├── useProfileStore.ts
│   ├── useToast.ts
│   └── useWebinarRegistration.ts
├── pages/               # Route components
│   ├── OverviewPage.tsx
│   ├── CoursesPage.tsx
│   ├── CertificatesPage.tsx
│   ├── NetworkPage.tsx
│   └── ProfilePage.tsx
├── types/               # TypeScript models
│   ├── certificate.ts
│   ├── cohortMember.ts
│   ├── course.ts
│   └── webinar.ts
├── App.tsx              # React Router v6 Configuration
├── index.css            # Global CSS (custom scrollbars, animations)
└── main.tsx             # Application Entry Point
```

---

## 🎨 Premium Features & Interactions

1. **State-Driven Routing**: Tab navigation is powered by React Router's `NavLink` active style matching rather than manual state triggers.
2. **Global Toast System**: Multiple success/info/error toast notifications slide in from the bottom right with entrance/exit CSS keyframe animations.
3. **Webinar Register State Machine**: Features an async simulation flow (800ms) showing a spinner and swapping styles from "Register to Attend" to a green checkmarked "Added to Calendar".
4. **Optimistic Cohort Connections**: Toggling connection states in the Overview directory updates the full Network page dynamically, accompanied by immediate Toast confirmations.
5. **Interactive Course Enrollment**: Enrolling in courses instantly moves them from "Available" to "Enrolled", starting progress bars from 0% and letting the user interactively progress.
6. **Dynamic Profile Synchronizer**: Saving edits in the Profile page updates the user avatar and profile details globally, reflecting immediately in the sticky header user menu.

---

## 🔧 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates a highly compressed static asset bundle inside `dist/`.
