# THE_JOURNAL — Lifestyle Minimal Blog (React + TypeScript)

This repository is a production-grade React + TypeScript migration of the "THE_JOURNAL" editorial lifestyle blog. It features minimalist design, intentional slow-journalism prose, interactive scrolling behaviors, a modular layout structure, and a custom lightweight notification system.

## Tech Stack
- **Framework:** React 19 + TypeScript (Strict Typechecking enabled)
- **Bundler:** Vite
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM (v6)
- **Icons:** Custom SVG + Lucide React (where applicable)

## Key Features & Implementations
1. **Zero-Placeholder Prose:** 18 unique, deep-vetted essays across Destinations, Style, and Wellness categories (6 essays per category).
2. **Reading Progress Bar:** A top-fixed visual progress indicator computed on scroll progress.
3. **Parallax Hero Banner:** The main homepage banner shifts Y-translation coordinates relative to vertical page scrolling.
4. **Interactive Tab Filtering:** Quick category filters on the homepage with smooth animations and dynamic client-side list filtering.
5. **Chic Toast System:** Elegant bottom-right notification banner triggers for newsletter submissions, likes, and filters.
6. **Robust Routing:** Client-side routing between indices and parameterized detail pages with automated scroll-to-top resets.

## Development Setup

First, install dependencies:
```bash
npm install
```

To run the development server locally:
```bash
npm run dev
```

To build the production-ready static assets bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```
