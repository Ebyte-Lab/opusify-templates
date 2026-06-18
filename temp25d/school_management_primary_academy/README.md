# SunnySide Academy Parent Portal

A production-grade, modular, parent-facing dashboard built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS v3**. This application serves as a re-architected migration from a static HTML prototype, transforming it into a high-fidelity, interactive, multi-page web application.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Architectures & Design Choices](#key-architectures--design-choices)
3. [Interactive Features](#interactive-features)
4. [File & Directory Structure](#file--directory-structure)
5. [Page Module Explanations](#page-module-explanations)
6. [Getting Started & Build Commands](#getting-started--build-commands)

---

## 🌟 Project Overview

**SunnySide Academy** is a parent portal designed to give parents a transparent view of their children's academic schedules, behavior rewards, class details, term reports, attendance logs, teacher communication, and cafeteria menus.

This repository migrates the original static HTML template into a modular React structure with:
*   **Fully-typed domain models** enforcing type safety across schedules, behavior tracker, message threads, calendar events, and menu dishes.
*   **Centralized reactive state** for real-time toggles (e.g. active child switches).
*   **Accessible keyboard-friendly controls** matching WCAG specifications.
*   **Simulated server requests** utilizing a custom artificial loading delay hook (`useFetchMock`) to showcase skeleton loader animations.

---

## 🏗️ Key Architectures & Design Choices

### 1. Unified State Providers
Instead of isolated component states, two global context providers govern the core portal activities:
*   **`ChildProvider`**: Manages the active child profile (Leo Miller vs. Mia Miller) and syncs the behavioral "earned stars" count. When a child context changes, all pages automatically re-fetch the matching child's data.
*   **`MessagesProvider`**: Holds the conversations inbox. Sending messages immediately updates the chat UI and clears the unread count. It also simulates realistic teacher typing responses with a `setTimeout` callback.

### 2. Client-Side Routing
Utilizes **React Router v6** (`createBrowserRouter`) defining clean nested routes inside `src/app/router.tsx`. View transitions are rendered dynamically using an `<Outlet />` within the central layout shell.

### 3. Reusable UI Primitive Library
To prevent ad-hoc styling duplicates, common design patterns have been extracted into UI primitives:
*   **`Button`**: Supports the core yellow chunky tactile button style (`shadow-chunky` offset shadows) and implements custom state translation transitions (`active:translate-y-1`).
*   **`Modal`**: An accessible dialog box implementing Escape-key closes, backdrop click cancellations, ARIA roles, and a strict **keyboard focus trap** (wrapping tabs inside the container).
*   **`ProgressBar` & `Badge`**: Color-coded pastels mapping to academic percentages and attendance standings.

---

## ⚡ Interactive Features

1.  **Multi-Child State Synchronization**: Click the parent view avatar chip to swap the dashboard profile. Changing between Leo and Mia dynamically rebinds academic metrics, calendar cards, behavior goals, and schedules.
2.  **Tactile Star Tracker**: Click on any empty star outline (or focus via keyboard and press `Enter`/`Space`) to increment the behavior stars. The star count triggers a custom keyframe `pop` animation.
3.  **Active Week Calculation**: The Class Schedule uses real date calculations computed by `useWeekNavigation()`. Clicking left/right buttons shifts the active week date range dynamically.
4.  **Bouncing "Today" Badges**: When viewing the current calendar week, the portal checks the day of the week. If a slot matches today's day (e.g. Tuesday), a bouncing "Today" badge is displayed.
5.  **Optimistic Chat Inbox & Replies**: The Messages tab and Header quick-chat modal are fully integrated. Typing a response sends it immediately to the active thread and prompts a teacher reply after a 2-second typing delay.
6.  **Pizza Friday Highlights**: The Cafeteria Menu page detects Friday and highlights Pizza Friday with a dedicated pulsing badge and gold-bordered card shadow.

---

## 📁 File & Directory Structure

Here is the complete project directory tree:

```
school_management_primary_academy/
├── dist/                          # Production build compilation output
├── node_modules/                  # Node Package dependencies
├── public/                        # Static assets (favicon, etc.)
├── src/
│   ├── app/                       # Core App Setup
│   │   ├── providers/             # Global State Contexts
│   │   │   ├── ChildProvider.tsx      # Student selection & star behavior state
│   │   │   └── MessagesProvider.tsx   # Conversational inbox threads & auto-replies
│   │   └── router.tsx             # React Router v6 browser route definitions
│   ├── components/                # Modular Components
│   │   ├── features/              # Feature-specific dashboard/page modules
│   │   │   ├── classes/
│   │   │   │   └── ClassCard.tsx          # Enrolled course info, supplies & teacher notes
│   │   │   ├── dashboard/
│   │   │   │   ├── HeroWelcomeBanner.tsx  # Interactive welcome hero greeting
│   │   │   │   ├── QuickActionTile.tsx    # Page shortcut tiles with unread badges
│   │   │   │   ├── StarBehaviorTracker.tsx# Interactive star reward board
│   │   │   │   └── WeeklyScheduleGrid.tsx # Class grid with active week calculation
│   │   │   ├── grades/
│   │   │   │   ├── GradeSubjectCard.tsx   # Course letter score & trend indicator
│   │   │   │   └── ReportCardPanel.tsx    # GPA calculator & report card PDF action
│   │   │   ├── attendance/
│   │   │   │   ├── AttendanceCalendar.tsx # June 2026 status calendar grid
│   │   │   │   └── AttendanceStatCard.tsx # Attendance percentages & stands
│   │   │   ├── messages/
│   │   │   │   ├── ChatBubble.tsx         # Aligned chat message bubbles
│   │   │   │   ├── ChatComposer.tsx       # Message inputs & send triggers
│   │   │   │   ├── ChatWindow.tsx         # Active message thread feed
│   │   │   │   ├── ThreadList.tsx         # Chat thread sidebar list
│   │   │   │   └── ThreadPreviewItem.tsx  # Individual preview items
│   │   │   └── lunch/
│   │   │       └── LunchMenuCard.tsx      # Cafeteria daily menus & allergen tags
│   │   ├── layout/                # Page Layout Shells
│   │   │   ├── AppShell.tsx           # Global wrap, sidebar nav & quick-peek modal
│   │   │   ├── ChildSwitcher.tsx      # Dropdown swapping active student
│   │   │   ├── Header.tsx             # Main navbar & mobile hamburgers
│   │   │   ├── MobileNavDrawer.tsx    # Slide-out drawer menu on mobile viewports
│   │   │   └── Footer.tsx             # Legal notes & copyright layout
│   │   └── ui/                    # Reusable UI Primitives
│   │       ├── Avatar.tsx             # Profile photo & initial placeholders
│   │       ├── Badge.tsx              # Small color indicators for tags
│   │       ├── Button.tsx             # Chunky tactile CTAs & Link wrappers
│   │       ├── Card.tsx               # Primary container card wrappers
│   │       ├── EmptyState.tsx         # Missing data or placeholder term warnings
│   │       ├── Modal.tsx              # Focus-trapped overlay dialog
│   │       ├── ProgressBar.tsx        # Percentage progress indicators
│   │       └── Tabs.tsx               # Segmented term button switchers
│   ├── data/                      # Structured Mock Seed Data
│   │   ├── mockAttendance.ts      # Seeding student daily status entries
│   │   ├── mockCalendar.ts        # Seeding social/holiday school events
│   │   ├── mockChildren.ts        # Seeding default child metrics
│   │   ├── mockGrades.ts          # Seeding midterm letter scores & reviews
│   │   ├── mockLunchMenu.ts       # Seeding food options & allergy notices
│   │   ├── mockMessages.ts        # Seeding teacher conversation threads
│   │   └── mockSchedule.ts        # Seeding daily classroom grid assignments
│   ├── hooks/                     # Custom Application Hooks
│   │   ├── useActiveChild.ts      # Accesses ChildContext details
│   │   ├── useDisclosure.ts       # Handles boolean states (modal/drawers)
│   │   ├── useFetchMock.ts        # Simulates loading durations (skeleton view trigger)
│   │   ├── useMessages.ts         # Accesses MessagesContext details
│   │   └── useWeekNavigation.ts   # Tracks dates & week offsets
│   ├── lib/                       # Low-level utilities
│   │   └── date.ts                # Greeting selectors & calendar date range math
│   ├── styles/                    # Global stylesheets
│   │   └── globals.css            # Base fonts, scrollbars, active clicks & keyframes
│   ├── types/                     # Shared TypeScript Interfaces
│   │   ├── attendance.ts
│   │   ├── calendar.ts
│   │   ├── child.ts
│   │   ├── grades.ts
│   │   ├── lunch.ts
│   │   ├── messages.ts
│   │   └── schedule.ts
│   └── main.tsx                   # DOM React mounting entrypoint
├── index.html                     # HTML Template
├── postcss.config.js              # PostCSS config
├── tailwind.config.ts             # Tailwind themes, colors & layout shadows
├── tsconfig.json                  # TypeScript compiler settings
├── tsconfig.node.json             # Build tool compilation config
└── vite.config.ts                 # Vite bundler, path aliases, & Vitest configs
```

---

## 📄 Page Module Explanations

*   **Home Dashboard (`/`)**: Displays the customized greeting banner, behavior star board, and class schedule side-by-side, plus four grid tiles summarizing metrics at a glance.
*   **Enrolled Classes (`/classes`)**: Lists each course the student is taking, detailing current topics, teacher profiles, room assignments, and necessary items (e.g. art smocks).
*   **Report Card (`/grades`)**: Features a term-by-term grading summary. Computes general class percentages and houses a download action button.
*   **Attendance (`/attendance`)**: Provides an overall breakdown of present, late, or absent days. Includes a monthly calendar visualizer.
*   **Messages Inbox (`/messages`)**: Houses chat history. Renders an inbox sidebar alongside active conversation panels with automated replies.
*   **School Calendar (`/calendar`)**: Displays school events. Clicking calendar days details academic/social entries in a sidebar.
*   **Cafeteria Menu (`/lunch`)**: Details breakfasts, lunches, and allergy notifications for Monday-Friday.

---

## 🚀 Getting Started & Build Commands

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### 1. Install Dependencies
Restore the project packages:
```bash
npm install
```

### 2. Run Locally in Development Mode
Fire up Vite's local dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the application.

### 3. Run Production Build & Type-Checks
Compile code and build the production bundle:
```bash
npm run build
```
This builds static assets into the `dist/` folder ready for deployment.

### 4. Run Unit Tests
Run Vitest to verify logic and helpers:
```bash
npm run test
```
