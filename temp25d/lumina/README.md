# Lumina Organic Storefront Rebuild

Lumina is a premium, production-grade organic goods e-commerce template rebuilt from a static HTML prototype into a component-driven React + TypeScript application. It features lightweight, native hash-based routing, global shopping cart state with `localStorage` persistence, and accessibility tokens.

---

## 🛠️ Tech Stack & Features

- **Core**: React 18, Vite (latest stable, security audited), TypeScript (strict mode enabled).
- **Styling**: Tailwind CSS v3 with centralized CSS variables, custom Lora (serif) & Nunito (sans-serif) Google Fonts.
- **Routing**: Lightweight Client-side Hash Router (`window.location.hash`). Zero external dependencies.
- **State Management**: React Context + `useReducer` with automatic browser persistence.
- **Animations**: Framer Motion for drawer & dialog actions, CSS animations for organic morphing blobs. Full support for user `prefers-reduced-motion` settings.

---

## 📂 File & Folder Structure

```text
lumina/
├── index.html                  # Main HTML Entrypoint (loads fonts, pre-connects assets)
├── tailwind.config.js          # Tailwind Theme Token configuration (colors, fonts, shadows)
├── postcss.config.js           # PostCSS compiler setup
├── tsconfig.json               # TypeScript project references configurations
├── tsconfig.app.json           # App-specific compiler options (strict & noImplicitAny: true)
└── src/
    ├── main.tsx                # App mount entrypoint
    ├── index.css               # Global CSS styles (themes, animations, scrollbars)
    ├── App.tsx                 # Dynamic Page Router & Layout Wrapper
    ├── types/
    │   └── product.ts          # Strongly typed interfaces (Product, CartItem, PurchaseType)
    ├── data/
    │   └── products.ts         # Mock product datasets (Skincare, Supplements, Bundles, Gift Cards)
    ├── hooks/
    │   ├── useCart.ts          # Global Cart hook for quick state operations
    │   ├── useCountUp.ts       # Numerical counter animation (uses IntersectionObserver)
    │   ├── useLockBodyScroll.ts# Overlay background scroll-lock
    │   ├── usePurchaseType.ts  # Switches price/type (one-time vs subscription)
    │   └── useSmoothScrollNav.ts # Animated scroll anchor support for Home
    ├── components/
    │   ├── ui/                 # Reusable Presentation Components
    │   │   ├── Badge.tsx       # Translucent metadata tag
    │   │   ├── Button.tsx      # Configurable primary/secondary buttons
    │   │   ├── IconButton.tsx  # Icon wrappers requiring explicit aria-labels
    │   │   └── OrganicBlob.tsx # Morphing blob canvas with motion-aware controls
    │   ├── cart/               # Basket State & Dialog components
    │   │   ├── CartProvider.tsx# Context state machine & localStorage sync
    │   │   ├── CartOverlay.tsx # Dimmed background backdrop
    │   │   ├── CartDrawer.tsx  # Accessible sliding cart drawer with live subtotal announcement
    │   │   ├── CartLineItem.tsx# Line item rows inside the cart
    │   │   ├── CartBadge.tsx   # Live count counter on navbar icon
    │   │   └── CheckoutModal.tsx# Escape key-closable order validation dialog
    │   └── layout/             # Shared structural elements
    │       ├── FloatingNavbar.tsx# Fixed floating navbar (collapsing, active link tags)
    │       └── Footer.tsx      # Newsletter form submission, navigation, legal text
    └── pages/                  # Route views
        ├── HomePage.tsx        # Hero banner, stats, category list spotlights, and mission
        ├── AllProductsPage.tsx # Combined catalog layout with tabbed category filters
        ├── SkincarePage.tsx    # Dedicated skincare products index
        ├── SupplementsPage.tsx # Dedicated nutritional supplements index
        ├── BundlesPage.tsx     # Cost-saving bundled package sets
        └── GiftCardsPage.tsx   # Customizable pricing denomination gift vouchers
```

---

## ✍️ Developer's Editing Guide

To customize or expand this template, use the following guide:

| Task / Objective | Target File(s) to Modify | Description |
| :--- | :--- | :--- |
| **Adding new products, bundles, or gift cards** | [`src/data/products.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/src/data/products.ts) | Modify or add items to `skincareProducts`, `supplementProducts`, `bundleProducts`, or `giftCardProducts` arrays. |
| **Adjusting color schemes, fonts, or shadows** | [`tailwind.config.js`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/tailwind.config.js)<br>[`src/index.css`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/src/index.css) | Edit Tailwind tokens or update CSS variables (`--bg`, `--primary`, `--text`, etc.) in `:root`. |
| **Adding a new independent page** | [`src/App.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/src/App.tsx)<br>[`src/pages/`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/src/pages/) | Create your new page file under `src/pages/`, add its hash endpoint to `renderPage()` switcher in `App.tsx`, and wire a link inside `FloatingNavbar.tsx`. |
| **Customizing the cart behavior** | [`src/components/cart/CartProvider.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/src/components/cart/CartProvider.tsx) | Update context reducers (pricing rules, tax, discounts, subscription policies). |
| **Updating metadata & SEO settings** | [`index.html`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/lumina/index.html) | Customize title tags, SEO keywords, browser description meta, and stylesheet CDNs. |

---

## 🚀 Commands & Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Run Local Development Server
Start the Vite HMR dev server:
```bash
npm run dev
```

### 3. Production Compilation & Type Checking
Generate type-safe static assets inside `dist/`:
```bash
npm run build
```
