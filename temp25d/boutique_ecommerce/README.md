# Atelier Opusify — High-End Boutique E-Commerce

Atelier Opusify is a luxury, production-grade minimalist e-commerce showcase application designed in React 18, Vite 5, Tailwind CSS v3, and Framer Motion, fully configured in **TypeScript** (`.ts`/`.tsx`). It features central cart state management, smooth animations, and interactive Lookbook Details overlays.

---

## 📂 Project Folder Structure

Below is the directory mapping for the e-commerce client codebase:

```text
temp25d/boutique_ecommerce/
├── public/
│   └── favicon.svg              # Golden brand monogram vector icon
├── src/
│   ├── assets/                  # Media files and assets
│   ├── components/              # React Components
│   │   ├── cart/                # Shopping Cart components
│   │   │   ├── CartItem.tsx     # Single product row inside the slide-out drawer
│   │   │   ├── CartOverlay.tsx  # Framer Motion animated dark backdrop mask
│   │   │   └── MiniCart.tsx     # Slide-out cart drawer list with Escape key closures
│   │   ├── layout/              # Structural components
│   │   │   ├── Header.tsx       # Absolute overlay header with blend mode differences
│   │   │   ├── Footer.tsx       # 4-column column footer with newsletter subscription
│   │   │   └── Layout.tsx       # Root wrapper managing CartProvider and scroll locks
│   │   ├── navigation/          # Menu components
│   │   │   ├── DesktopNav.tsx   # Inline menu links and cart badges
│   │   │   ├── MobileNavBar.tsx # Small-screen header with slide-down navigation lists
│   │   │   └── NavLink.tsx      # Link items with custom underline hover transitions
│   │   ├── sections/            # Major page sections
│   │   │   ├── HeroSection.tsx  # Immersive full-screen background with Ken Burns scale zooms
│   │   │   ├── IntroStatement.tsx # Brand statement with scroll-triggered fade animations
│   │   │   ├── FeatureShowcase.tsx # Alternating collection detail grids
│   │   │   └── LookbookCarousel.tsx # Horizontal scroll snapping lookbook cards gallery
│   │   ├── ui/                  # UI elements
│   │   │   ├── FeatureItem.tsx  # Responsive single collection grid row
│   │   │   ├── LookbookCard.tsx # Snap card inside the lookbook carousel
│   │   │   ├── LookDetailsModal.tsx # Fullscreen detailed overlay with featured cart integration
│   │   │   └── NewsletterForm.tsx # Controlled email submission forms
│   │   └── index.ts             # Barrel export file
│   ├── context/
│   │   └── CartContext.tsx      # Reducer-based shopping cart provider
│   ├── data/                    # Static mock seed datasets
│   │   ├── cartItems.ts         # Preloaded starting cart items
│   │   ├── features.ts          # Core and exclusive editorial blocks
│   │   ├── footerColumns.ts     # Client care policies and social handles
│   │   ├── lookbook.ts          # Look details, locations, and featured items list
│   │   └── navLinks.ts          # Primary header menu targets
│   ├── hooks/                   # Reusable stateful functions
│   │   ├── useBodyScrollLock.ts # Toggles body overflow:hidden when side modals are active
│   │   ├── useCart.ts           # Exposes cart states and computes line-item subtotals
│   │   └── useScrollCarousel.ts # Calculates snap-scroll track positions
│   ├── styles/
│   │   └── globals.css          # Core CSS variables, Fontsource imports, and reset rules
│   ├── App.tsx                  # Main orchestration page component
│   ├── main.tsx                 # Root client entry point loading Fontsource files
│   ├── types.ts                 # Central TypeScript interfaces
│   └── vite-env.d.ts            # Vite client type injections
├── eslint.config.js             # Flat ESLint rules alignment matching workspace settings
├── postcss.config.js            # PostCSS compiler setups
├── tailwind.config.js           # Tailwind v3 design variables and animations
├── tsconfig.json                # TypeScript root module mapping configuration
├── tsconfig.app.json            # TypeScript frontend compile parameters
└── tsconfig.node.json           # TypeScript bundler compile configs
```

---

## 🛠️ Architecture & Core Modules

### 1. Centralized Cart Context (`CartContext.tsx` & `useCart.ts`)
Global cart interactions are powered by React Context and `useReducer`. The reducer listens to four main action signatures:
- `OPEN_CART` / `CLOSE_CART` / `TOGGLE_CART`: Updates `isOpen` state to animate the sidebar in and out.
- `SET_ITEMS`: Overwrites the list of cart items (used for initial seed preloading and look catalog additions).
- `REMOVE_ITEM`: Filters out specified item IDs from the list.

The hook `useCart.ts` acts as a selector to retrieve these values, exposing utility actions (`open`, `close`, `removeItem`) and computing the total price via `Array.prototype.reduce`.

### 2. Lock Overlay Controls (`useBodyScrollLock.ts`)
To prevent double-scrolling behind active drawers, `useBodyScrollLock` accepts a boolean condition. When `true`, it updates the document body `style.overflow` attribute to `hidden`, clean-restoring standard parameters when unmounted.

### 3. Lookbook Detail Modal Panel (`LookDetailsModal.tsx`)
Hovering over any card inside the horizontal snap-carousel reveals a **"View Details"** control. Clicking this opens a full-screen layout details overlay, which:
- Restricts document background scrolling.
- Displays high-resolution look imagery, editorial description paragraph copy, and location metadata.
- Integrates a **Featured Items** selector allowing users to add individual items from that specific look directly into the global shopping cart, demonstrating responsive context mutations.

---

## 🚀 Commands

To launch development servers or build bundles:

```bash
# Install dependencies
npm install

# Start local server on http://localhost:5174/
npm run dev

# Lint checker compliance
npm run lint

# Compile production-ready dist assets
npm run build
```
