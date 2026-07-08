# Tech Cruncher - Production React & TypeScript Edition

A highly optimized, production-grade migration of the Tech Cruncher blog/magazine prototype, built with React 19, TypeScript (Strict Mode), and Tailwind CSS v3.

## Technical Highlights

- **Vite & React 19**: Faster boot times, modular component structure, and modern build pipelines.
- **Strict TypeScript**: 100% type coverage with domain schemas defined in `src/types.ts`. Zero `any` usage.
- **Responsive Layout**: Pixel-perfect replication of styling details, with a fluid mobile drawer navigation and responsive layout grids.
- **Custom Contexts**:
  - `ThemeContext`: Handles light/dark themes, persists preferences in `localStorage`, and triggers theme-toggle notifications.
  - `ToastContext`: Fixed notification stack in the bottom-right viewport with automatic dismissal.
- **Client-Side Search**: Live search queries processing via `react-router-dom` search query params (`/news?q=...`).

## Project Architecture

```
src/
  types.ts                    # Core TypeScript domain contracts
  main.tsx                    # Mount point and global styles import
  App.tsx                     # Router + global provider trees
  styles/
    globals.css               # CSS Variables, marquee animation, scrollbars
  context/
    ThemeContext.tsx          # System + user theme sync
    ToastContext.tsx          # Non-blocking notification dispatch
  hooks/
    useLike.ts                # Like toggles & localized number formatting
    useBookmark.ts            # Bookmarking with custom alerts
  data/
    articles.ts               # In-depth news stream mock dataset
    reviews.ts                # Frameworks & products telemetry logs
    podcasts.ts               # Podcast schedule
    events.ts                 # Virtual & in-person conferences
    ticker.ts                 # Top marquee messages
  components/
    layout/
      TickerBar.tsx           # Continuous marquee trend banner
      Navbar.tsx              # Desktop header & search validation
      MobileDrawer.tsx        # Slide-over sidebar panel
      Footer.tsx              # Standard credits & copyright
      ToastViewport.tsx       # Notifications queue display
    ui/
      ThemeToggleButton.tsx   # Mode switcher (Sun/Moon)
      LikeButton.tsx          # 👍 state manager
      BookmarkButton.tsx      # Bookmark manager
      Badge.tsx               # Primary / Danger tag pill
      Avatar.tsx              # Profile photo wrapper
    articles/
      HeroArticle.tsx         # Featured breaking story
      ArticleCard.tsx         # Horizontal feed card
      RelatedCard.tsx         # Grid card
    sidebar/
      AboutCard.tsx           # About widget
      ReviewTelemetryCard.tsx # Sidebar reviews log
      CommunityStatsCard.tsx  # Metrics display panel
    newsletter/
      NewsletterBanner.tsx    # Subscriptions form with toast validation
  pages/
    HomePage.tsx              # Combined primary stream, sidebar, and banners
    NewsListingPage.tsx       # News index with live search support
    ArticleDetailPage.tsx     # Full reading layout
    ReviewsPage.tsx           # Product benchmark reviews
    ReviewDetailPage.tsx      # Pros, cons, and performance scores
    PodcastsPage.tsx          # Podcasts listing
    EventsPage.tsx            # Schedules listing
    SubscribePage.tsx         # pricing grid + newsletter subscription
    NotFoundPage.tsx          # Error 404 page
```

## Running the Project Locally

To run the development server:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite dev server
npm run dev

# 3. Compile and build production bundles
npm run build
```
