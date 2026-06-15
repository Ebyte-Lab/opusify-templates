# OPUSIFY Photography & Art Director Portfolio Template

A premium, production-grade photography portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is designed with a clean, minimal, gallery-first, and editorial-focused visual aesthetic.

## 🚀 Key Features
- **Responsive Navigation**: Includes a fixed left-aligned desktop sidebar and a sticky mobile navbar header with a fullscreen mobile overlay menu.
- **Active Section Tracking**: Automatically highlights navigation items in the sidebar as you scroll through the page sections.
- **Hero Snap Gallery**: A full-bleed horizontal scroll snapping slider showcasing high-impact series with edge overlays and arrow indicator hints.
- **CSS Masonry Grid**: A selected works gallery supporting automatic image layouts.
- **Interactive Category Filtering**: Instantly filters portfolio pieces by categories (Portraits, Landscapes, Editorial, All).
- **Dynamic Pagination**: Built-in "Load More" action slicing through lists dynamically.
- **Portal-based Lightbox**: Click any gallery item to launch a portal-rendered lightbox modal featuring backdrop dismiss, close indicators, a loading spinner, and responsive next/prev navigation.
- **Keyboard Navigation**: Press `Escape` to close menus/lightboxes, or use `←` and `→` arrow keys to browse through pictures while the lightbox is active.

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript (Strict mode enabled)
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React (or custom SVG indicators)
- **Typography**: `@fontsource/lato` and `@fontsource/playfair-display`

## 📂 Project Structure
```text
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MobileHeader.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── HeroGallery.tsx
│   │   ├── PortfolioGrid.tsx
│   │   └── BookingFooter.tsx
│   └── ui/
│       ├── NavLink.tsx
│       ├── HeroSlide.tsx
│       ├── MasonryItem.tsx
│       └── Lightbox.tsx
├── data/
│   ├── navLinks.ts
│   ├── heroSlides.ts
│   ├── galleryImages.ts
│   └── studioInfo.ts
├── hooks/
│   ├── useMobileMenu.ts
│   ├── useLightbox.ts
│   └── useBodyScrollLock.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

## ⚙️ Running Locally
1. Navigate into the template directory:
   ```bash
   cd temp25d/portfolio_photography
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Boot the local development server:
   ```bash
   npm run dev
   ```
4. Build the static production bundle:
   ```bash
   npm run build
   ```

## ✍️ Customizing Content
All text content, media listings, and metadata are structured within type-safe configurations in `src/data/`:
- **`src/data/navLinks.ts`**: Customize top-level site navigation hooks.
- **`src/data/heroSlides.ts`**: Edit the featured slideshow images, descriptions, and headers.
- **`src/data/galleryImages.ts`**: Update the gallery list with image source paths, EXIF specifications, categories, and labels.
- **`src/data/studioInfo.ts`**: Personalize location details, email addresses, contact phone numbers, and call-to-action blurbs.
