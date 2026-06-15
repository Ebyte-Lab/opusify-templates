# Minimal Dark Developer Portfolio - React Rebuild

A production-grade, terminal-styled developer portfolio template rebuilt in React 18, TypeScript, and Tailwind CSS. The design preserves the exact original visual identity (near-black background `#0D0D0D`, neon green accent `#00FF41`, and Fira Code/Space Grotesk typography) while introducing a fully responsive, modular, and type-safe architecture.

---

## 🚀 Getting Started

To run the project locally, run the following commands:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Compile and build for production
npm run build
```

---

## 🛠 Tech Stack

- **React 18** & **TypeScript**
- **Vite** (Next-gen frontend tooling)
- **Tailwind CSS** (Configured with theme extensions mapping CSS variables)
- **Framer Motion** (Subtle entry and scroll fade animations)
- **Lucide React** (Accessibility-compliant, lightweight SVG icons)
- **@fontsource** (Self-hosted Fira Code and Space Grotesk fonts)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Sticky header navigation with scroll-spying highlights
│   │   ├── MobileMenu.tsx     # Keyboard-accessible slide-down mobile menu
│   │   └── Footer.tsx         # Nominal system status indicator + Social icons
│   ├── sections/
│   │   ├── Hero.tsx           # Terminal console containing intro and skills
│   │   ├── Projects.tsx       # Grayscale-to-color hovered cards grid
│   │   └── Experience.tsx     # Timeline execution trace
│   └── ui/
│       ├── ProjectCard.tsx    # Responsive grid card with versioning tags
│       ├── CodeBlock.tsx      # Regex-based custom tokenizer for code highlights
│       ├── TimelineItem.tsx   # Individual experience timelines
│       ├── SkillTag.tsx       # Reusable console status and tech stack tags
│       └── TerminalWindow.tsx # Terminal mockup frame with red/yellow/green indicators
├── data/
│   ├── hero.ts                # Commands and headers copy
│   ├── navLinks.ts            # Desktop & mobile navigation link anchors
│   ├── skills.ts              # Tech stack displayed inside console
│   ├── projects.ts            # Featured projects details + code snippets
│   └── socials.ts             # Social media profile links
├── hooks/
│   ├── useActiveSection.ts    # IntersectionObserver spier for scroll highlighting
│   └── useMobileMenu.ts       # Dropdown lock-scroll & escape-key listener
├── types/
│   └── index.ts               # Core typescript type definitions
├── styles/
│   └── globals.css            # Custom root colors, scrollbar overrides, selections
├── App.tsx                    # Top-level coordinator
└── main.tsx                   # Mounting index
```

---

## 📝 Customizing Your Content

All portfolio text, skills, projects, and experiences are completely data-driven. You can update the portfolio content without touching any React JSX components. 

Simply modify the files inside `src/data/`:
1. **`src/data/hero.ts`**: Update the console command strings, role titles, and tagline descriptions.
2. **`src/data/skills.ts`**: Customize the core technologies list shown under `cat current_status.txt`.
3. **`src/data/projects.ts`**: Add, modify, or remove featured projects. You can supply raw code snippets in Go or Python, and the custom parser will automatically colorize them according to the terminal syntax styling!
4. **`src/data/experience.ts`**: Update work experience items, date ranges, descriptions, and tags. Setting the `current` flag to `true` activates the neon glow indicator.
5. **`src/data/navLinks.ts`** & **`src/data/socials.ts`**: Manage navigation and social links.
