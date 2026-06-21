# FinTech Pro SaaS Dashboard (React + TypeScript)

This is a production-grade, highly interactive **FinTech Pro SaaS Dashboard** migrated from a static single-page prototype to a modular **React + TypeScript** SPA.

## Tech Stack & Highlights
- **Vite + React 18/19 + TypeScript**: Strict type safety enabled.
- **Tailwind CSS (v4)**: Modern style system with custom dark theme, ticker flashes, and styling variables.
- **Zustand**: Fast and unified global state manager handling UI states, live assets prices, FX converter calculations, search queries, and trace dialog details.
- **React Router v6**: `<HashRouter>` configured for clean, route-based tab panels (`/dashboard`, `/transactions`, `/portfolios`, `/reports`, `/settings`).
- **Recharts**: Responsive area and donut allocations diagrams.
- **Lucide React**: Modular vector icons replacing inline SVG markup.

## Project Structure
```text
temp25d/saas_dashboard_fintech_pro/
├── dist/                          # Production builds
├── src/
│   ├── components/                # Modular UI components
│   │   ├── dashboard/             # Balance cards, chart cards, exchange cards
│   │   ├── layout/                # Sidebar, User card, Mobile header, Ticker
│   │   ├── ledger/                # Tables, Rows, Search, Filters, Trace Modal
│   │   ├── portfolios/            # Asset allocations, Positions list
│   │   ├── reports/               # Generator form, Report item listings
│   │   └── settings/              # API table managers, Profile preferences
│   ├── data/                      # Initial mock data catalogs
│   ├── hooks/                     # Custom hooks and Zustand global store
│   ├── lib/                       # Utility helpers (formatting functions)
│   ├── pages/                     # Routed view components
│   ├── types/                     # Shared TypeScript interfaces
│   ├── App.tsx                    # Layout and HashRouter mapping
│   ├── index.css                  # Tailwind imports and animations
│   ├── main.tsx                   # React DOM entrypoint
│   └── vite-env.d.ts              # Vite client types reference
├── index.html                     # HTML5 layout root
├── package.json                   # Configurations and scripts
├── postcss.config.js              # PostCSS plugins (Tailwind CSS v4 & Autoprefixer)
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundle aliases and plugins
```

## Features Implemented
1. **Interactive Routing**: Sidebar navigation maps to individual routed pages. Back / Forward button flows work seamlessly using Hash-based routes.
2. **Periodic Ticker Simulation**: Background interval periodically drifts a random asset's value, updating the Zustand state and triggering CSS animations in components.
3. **Reactive Currency Exchange**: Compute settlement target values dynamically relative to funding inputs and selected FX base/target options.
4. **Audit Trace Modal**: Click any transaction row in the ledger history across the dashboard or transactions views to launch a detailed audit modal, featuring Escape key listeners and focus trapping.
5. **Holdings Allocations**: Aggregated stats are plotted in a responsive Donut chart and a comprehensive asset cost positions table.
6. **Reports Compiler**: Configurable parameters with simulated generation timeouts and compiler delays before files become ready.
7. **Credentials Manager**: Generate new keys, hide/reveal token previews, and toggle revoked statuses.

## Dev & Build Commands
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
3. **Compile Production Bundle**:
   ```bash
   npm run build
   ```
4. **Local Production Preview**:
   ```bash
   npm run preview
   ```
