# ⚡ NEXUSGEAR STOREFRONT — DEVELOPER PLATFORM

Welcome to the **NEXUSGEAR** storefront. This repository houses a high-fidelity, production-ready React + TypeScript + Tailwind CSS storefront designed with a sleek cyberpunk neon aesthetic. 

This document serves as a comprehensive architectural blueprint and extension guide.

---

## 📂 Project Architecture & Component Map

Here is the structured architecture of the codebase, detailing the responsibility of each module:

```bash
nexusgear/
├── index.html                  # Main HTML document template, contains page SEO meta tags and favicon
├── tailwind.config.ts          # Tailwind theme configuration, maps CSS variables to styling tokens
├── postcss.config.js           # PostCSS configuration integrating Autoprefixer and Tailwind
├── tsconfig.app.json           # Application TypeScript compilation configurations (strict: true)
├── src/
│   ├── main.tsx                # App bootstrap entry point (binds to document root)
│   ├── App.tsx                 # Core orchestrator; manages filter states and overlay coordinates
│   ├── index.css               # Design tokens (CSS custom properties), scrollbars, and neon glow utility classes
│   │
│   ├── types/
│   │   └── product.ts          # Strongly typed interfaces (Product, CartItem, SpecGroup, Review)
│   │
│   ├── data/                   # Centralized local static data layers
│   │   ├── products.ts         # Catalog inventory listing categories, tags, pricing, images, and descriptions
│   │   ├── specs.ts            # Key-value specs categories for the accordion panel
│   │   └── reviews.ts          # Client telemetry reviews data
│   │
│   ├── hooks/                  # Customized reusable react hooks
│   │   ├── useCart.ts          # Simplifies consuming the global CartContext
│   │   ├── useTilt3D.ts        # Coordinates 3D cursor-tracking rotations (respects reduced motion settings)
│   │   ├── useAccordion.ts     # Manages multiple toggle states for accordion panels
│   │   ├── useLockBodyScroll.ts# Prevents window background scrolling during modal or drawer active states
│   │   └── useSmoothScrollNav.s# Navigates to anchors with custom sticky header offset (~100px)
│   │
│   └── components/             # Reusable UI & Layout Components
│       ├── ui/                 # Atomic design tokens (Buttons, Panels, Status Tags)
│       ├── layout/             # Master wraps (Header sticky top bar, Footer email capture and footer indexes)
│       ├── cart/               # Cart drawers, overlay triggers, line items, and transaction console modals
│       └── sections/           # Modular viewports (Hero 3D Showcase, Sidebar filter panel, Product lists)
```

---

## 🛠️ Developer Extension Guide: What to Edit

If you want to customize or extend the NexusGear storefront, refer to this cheatsheet to locate the exact files you need to modify:

### 1. Adding, Editing, or Removing Products
* **Files to edit:**
  * [`src/data/products.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/data/products.ts) — Add or modify items in the static list.
  * [`src/types/product.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/types/product.ts) — If you need to add custom fields to products (e.g., `rating`, `warranty`).
* **Format Structure:**
  Ensure new items match the `Product` interface:
  ```typescript
  {
    id: number;
    name: string;
    specs: string;
    price: number;
    category: 'laptops' | 'audio' | 'accessories' | 'components';
    tag: 'IN STOCK' | 'LOW STOCK' | 'PRE-ORDER' | 'CYBER EDITION';
    img: string;
  }
  ```

### 2. Customizing the Color Palette & Glow Aesthetics
* **Files to edit:**
  * [`src/index.css`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/index.css) — Edit the CSS variables inside the `:root` block to update color theme tokens:
    ```css
    --bg: #0B0F19;        /* Change page background */
    --primary: #00E5FF;   /* Change neon accent color (e.g., to neon green #39FF14) */
    --secondary: #1A2235; /* Change card backing border color */
    --text: #D1D5DB;      /* Change standard font color */
    ```
  * [`tailwind.config.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/tailwind.config.ts) — Map new properties or adjust Tailwind grid extension variables.

### 3. Modifying Accordion Hardware Specifications
* **Files to edit:**
  * [`src/data/specs.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/data/specs.ts) — Add rows, value labels, or create entirely new accordion folders.
  * [`src/components/sections/SpecsAccordion.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/components/sections/SpecsAccordion.tsx) — Modify layout or rendering details.

### 4. Updating Client Telemetry (Reviews)
* **Files to edit:**
  * [`src/data/reviews.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/data/reviews.ts) — Add new user reviews, adjust ratings (1-5), and update customer tags.

### 5. Adjusting the 3D Interactive Model rotation sensitivity
* **Files to edit:**
  * [`src/hooks/useTilt3D.ts`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/hooks/useTilt3D.ts) — Modify rotation calculations or customize tilt sensitivity.
  * [`src/components/sections/Hero3DViewer.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/components/sections/Hero3DViewer.tsx) — Pass a different sensitivity multiplier into `useTilt3D(degree)` (default is `30`). You can also modify the HTML structures inside the card mesh.

### 6. Changing Cart Actions & Checkout Animations
* **Files to edit:**
  * [`src/components/cart/CartProvider.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/components/cart/CartProvider.tsx) — Edit custom reducer logic (e.g., if you want to alter cart persistence keys, add promo code features, etc.).
  * [`src/components/cart/CheckoutModal.tsx`](file:///home/ebedi/Documents/Project/ebytespace/opusify-templates/temp25d/nexusgear/src/components/cart/CheckoutModal.tsx) — Modify simulated script logs or typing speeds (currently typed out every `500ms`).

---

## 💻 Commands

Execute the following commands in the project root:

### ⚙️ Install Dependencies
```bash
npm install
```

### ⚙️ Run Local Development Server
```bash
npm run dev
```

### ⚙️ Compile Production Bundle
```bash
npm run build
```

### ⚙️ Preview Local Production Build
```bash
npm run preview
```
