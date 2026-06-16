# Developer Folio — Bento Portfolio Template

A modern, production-grade, dark-themed bento-grid portfolio designed for Full-Stack and Systems Engineers. Built with Vite, React 18, TypeScript, and Tailwind CSS v3.

## Features

- **Dark Bento Grid Layout**: Inspired by GitHub's dashboard aesthetic, featuring deep navy backgrounds, sky-blue accents, and border glow effects on hover.
- **Seeded Contribution Heatmap**: A deterministic, animated contribution graph that remains stable across refreshes and uses a custom Mulberry32 pseudo-random number generator (PRNG).
- **Faux Code Editor**: An interactive, tokenized TypeScript editor component that supports rich hover effects and slide-up overlay CTAs.
- **Active Navigation Tracking**: Seamless IntersectionObserver-driven header link highlights that react dynamically as sections are scrolled into view.
- **Accessible Mobile Navigation**: Fully-featured mobile hamburger drawer rendering via React Portal, including escape key handling, body scroll locking, and accessibility focus trapping.
- **Self-Hosted Cal Sans Font**: Fast, localized typography loading (Cal Sans and Roboto weights) with zero reliance on external CDNs.
- **Production Quality**: Strict ESLint rules, zero-warning TypeScript configurations, and verified vulnerability-free npm package dependencies.

## Setup Instructions

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd temp25d/developer_folio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Compile and bundle the application for production:
```bash
npm run build
```
The optimized bundle assets will be output to the `dist/` directory.

### Linting & Formatting

Verify code style and rules conformance:
```bash
npm run lint
```

---

## How to Personalize

All content, profile stats, and configurations are externalized into type-safe data files under the `src/data/` directory. You can customize the portfolio without touching any UI component:

1. **Profile and Availability (`src/data/profileInfo.ts`)**:
   - Customize your title lines, bio paragraph, availability status, availability label, and external links (GitHub URL, contact page).
   
2. **Current Focus (`src/data/statusInfo.ts`)**:
   - Change your profile avatar, current tech focus domain, and the lines of code displayed in the faux-terminal command box.

3. **Tech Stack (`src/data/techStack.ts`)**:
   - Add, edit, or remove technologies. Each item has custom hex colors, labels, and descriptive titles.

4. **Featured Repository (`src/data/repositories.ts`)**:
   - Swap the project name, description, primary language, stats (stars and forks count), and repository link.

5. **Tokenized Code Editor Snippet (`src/data/codeSnippet.ts`)**:
   - Update the structured line and token array to display your own custom syntax-highlighted code.
