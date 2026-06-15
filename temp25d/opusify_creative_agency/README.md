# 🏗️ OPUSIFY Creative Agency — React + Vite + Tailwind

Welcome to the **OPUSIFY Creative Agency** React application template. This is a production-grade, highly interactive portfolio featuring modern, fluid animations and an avant-garde design aesthetic. 

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Bundler / Dev Server** | [Vite 6.4.3](https://vite.dev/) *(Patched secure release)* |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS |
| **Animation Engine** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | `@fontsource/inter` & `@fontsource/syne` |
| **Linter / Formatter** | ESLint 9 + Prettier |

---

## 📁 Project Structure

The project has been scaffolded using a highly organized component-based architecture:

```
opusify_creative_agency/
├── public/
│   └── favicon.svg             # Brand vector favicon
├── src/
│   ├── assets/                 # Local media and assets
│   ├── components/             # Reusable React components
│   │   ├── layout/
│   │   │   ├── Header.jsx      # Sticky/Absolute Logo banner
│   │   │   ├── Footer.jsx      # Big-text Kigali footer
│   │   │   └── Layout.jsx      # Main layout grid container wrapper
│   │   ├── navigation/
│   │   │   ├── MenuToggle.jsx  # Morphing hamburger button (✕)
│   │   │   └── MobileMenu.jsx  # Fullscreen slide-in navigation overlay
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx # Staggered intro text + hero image
│   │   │   ├── MarqueeTicker.jsx # Twin rotated looping marquee bands
│   │   │   └── WorkSection.jsx # Staggered case studies grid
│   │   ├── ui/
│   │   │   ├── RevealCard.jsx  # Hover image-reveal anchor wrapper
│   │   │   └── CaseStudyCard.jsx # Asymmetric cards wrapper with exclusion color overlays
│   │   └── index.js            # Barrel exports for easy importing
│   ├── data/
│   │   └── caseStudies.js      # Centralized project content configurations
│   ├── hooks/
│   │   └── useMenuToggle.js    # Side drawer toggle hook + body overflow lock
│   ├── styles/
│   │   └── globals.css         # CSS Variables and hover transition classes
│   ├── App.jsx                 # Assembles sections and layout frames
│   └── main.jsx                # Entrypoint rendering React DOM and mounting font files
├── tailwind.config.js          # Extended color variables, fonts, and marquee animations
├── postcss.config.js           # PostCSS configuration file
├── vite.config.js              # Vite bundler configurations
├── eslint.config.js            # ESLint flat config with JSX runtime support
├── .prettierrc                 # Code style guidelines
└── package.json                # Project dependencies and runner scripts
```

---

## 🎨 Theme Tokens (CSS Variables)

Colors are bound to CSS variables inside `src/styles/globals.css`, enabling dynamic design adaptations:

```css
:root {
  --color-bg:        #F4F4F0; /* Pale warm background */
  --color-primary:   #FF3366; /* Vibrant pink accent */
  --color-secondary: #4A00E0; /* Deep blue/purple */
  --color-text:      #1A1A1A; /* Near-black body text */
}
```

These correspond to custom Tailwind utility classes:
* Background: `bg-bg`
* Primary: `bg-primary` / `text-primary`
* Secondary: `bg-secondary` / `text-secondary`
* Text: `bg-text` / `text-text`

---

## 🎬 Animation Guidelines (Framer Motion)

The application uses specific easing variants to ensure smooth transitions:

* **Staggered Page Entrance** (`0.15s` delay step):
  ```js
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };
  ```
* **Card Scroll Reveal**:
  Utilizes the `useInView` hook in combination with opacity/y coordinates translations (`y: 30` ➔ `y: 0`) with custom cubic-bezier curves `[0.16, 1, 0.3, 1]`.

---

## ✍️ Updating Content

The codebase enforces a strict separation of concerns. To add, modify, or delete section content, **never edit JSX files directly**. Update the data arrays inside `src/data/caseStudies.js`:

1. **`caseStudies`**: Controls the work grids. Supports defining custom heights, background classes (`bgClass`), tag colors, and layouts.
2. **`marqueeItems`**: Array of items rotating in the marquee band.
3. **`navLinks`** & **`footerLinks`**: Navigation maps for headers, mobile overlays, and footers.

---

## 🚀 Getting Started

### 1. Installation
Navigate to the project directory and install the pinned dependencies:
```bash
npm install
```

### 2. Development Mode
Start the HMR dev server:
```bash
npm run dev
```

### 3. Production Build
Compile and bundle production assets:
```bash
npm run build
```

### 4. Code Quality Linting
Run syntax validation:
```bash
npm run lint
```
