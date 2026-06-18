# 🎓 Opus Coding Bootcamp Student Portal

A production-grade, highly interactive **Student Dashboard & Portal** for **Opus Coding Bootcamp**. This portal features a premium dark-mode, IDE-styled design crafted with Tailwind CSS v4, custom monospace styling, dashed-border accents, and strict TypeScript compliance.

---

## 🚀 Key Features

- **📚 Curriculum Syllabus Explorer**: Interactive modules (`m1` to `m4`) featuring expandable lesson syllabus tracking, durations, locking/unlocking states, and visual completion progress bars.
- **💻 Assignment Workspace**: Dedicated code snippet viewer (with Prism syntax highlighting), custom drag-and-drop workspace dropzone supporting file/GitHub repo submissions, and graded status badges.
- **💬 Cohort Chat Panel**: Real-time mock chat panel for student-instructor communications, featuring code snippet auto-formatting (`code` inline parsing) and staff designations.
- **📊 Grades & Detailed Feedback**: A breakdown of graded projects showing score ratios, percentages, and inline instructor feedback reviews.
- **🏆 Gamified Leaderboard**: Standings showing rank progression, accumulated XP counters, and highlighting the student's relative position in the cohort.
- **📣 Community Discussions Board**: Categorized community threads supporting sorting (Newest/Popular), thread details, and replies rendering (with specialized staff tags).
- **📂 Resource Library**: Curated list of technical resources, cheatsheets, cheatsheet video guides, and repositories organized by category filter.

---

## 🛠️ Technology Stack

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescript.org/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/postcss` and native `@theme` directives)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons (FontAwesome)](https://react-icons.github.io/react-icons/)
- **Syntax Highlighting:** [React Syntax Highlighter (Prism)](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- **Routing:** [React Router DOM](https://reactrouter.com/) (HashRouter configuration for stable, server-independent deployment)

---

## 📂 Directory Structure

Here is a map of the codebase to help you navigate and understand the files:

```text
school_management_coding_bootcamp/
├── index.html                  # Main HTML Entry point
├── package.json                # Project dependencies and script runner configurations
├── postcss.config.js           # PostCSS configuration using @tailwindcss/postcss
├── tailwind.config.ts          # Tailwind configurations (for tooling fallback)
├── tsconfig.json               # Main TS Config setting up module path resolutions
├── tsconfig.app.json           # Application specific TS Config (verbatimModuleSyntax enabled)
├── tsconfig.node.json          # Node specific TS Config for bundlers/configs
├── vite.config.ts              # Vite configurations and alias bindings
└── src/
    ├── main.tsx                # React application bootstrapper
    ├── App.tsx                 # Core application setup, routing definitions, & shell integration
    ├── app/
    │   └── providers/
    │       └── ChatPanelProvider.tsx # Cohort chat context provider & message handler state
    ├── assets/                 # Static asset folders
    ├── styles/
    │   └── globals.css         # CSS base definitions, custom webkit scrollbars, selection rules, & Tailwind v4 `@theme` variables
    ├── lib/
    │   └── format.ts           # String/date formatting utility functions (XP formatters, time ago calculations)
    ├── hooks/
    │   ├── useChatPanel.ts     # Hook to consume the global ChatContext state
    │   ├── useDisclosure.ts    # Utility hook to manage boolean open/close drawers states
    │   ├── useFetchMock.ts     # Simulates async API latency for fetching state data
    │   ├── useFileDrop.ts      # Custom hook to manage drag & drop uploads
    │   └── useSidebarDrawers.ts# State controller for mobile left/right side drawers
    ├── types/                  # Strict type interfaces for data models
    │   ├── assignment.ts       # Assignment & CodeExample structure types
    │   ├── chat.ts             # Chat messages & roles structures
    │   ├── discussion.ts       # Discussions & replies structures
    │   ├── grade.ts            # Grades & scores records
    │   ├── leaderboard.ts      # Cohort Leaderboard entry structure
    │   ├── module.ts           # Syllabus modules & lesson structures
    │   ├── resource.ts         # Resource reference structures
    │   └── schedule.ts         # Calendar timeline events structures
    ├── data/                   # Mock JSON-like databases
    │   ├── mockAssignments.ts  # Assignments seed data
    │   ├── mockChatMessages.ts # Initial chat conversation history
    │   ├── mockDiscussions.ts  # Forum discussion threads & reply feeds
    │   ├── mockGrades.ts       # Graded assignment score sheets
    │   ├── mockLeaderboard.ts  # Mock leaderboard roster
    │   ├── mockModules.ts      # Full syllabus module-lessons hierarchy
    │   ├── mockResources.ts    # Curated resource catalog
    │   └── mockSchedule.ts     # Live sessions calendar events
    ├── components/             # Reusable UI & Layout Components
    │   ├── ui/                 # Atomic design UI elements
    │   │   ├── Avatar.tsx      # Standardized avatars with indicator ring states
    │   │   ├── Badge.tsx       # Semantic badges (success, error, primary, staff)
    │   │   ├── Button.tsx      # Buttons with style variations
    │   │   ├── EmptyState.tsx  # Standard placeholder for empty states
    │   │   └── ProgressBar.tsx # Color-filled progress indicator bars
    │   ├── layout/             # Navigation and page frame structures
    │   │   ├── AppShell.tsx    # Overall layout grid managing sidebar placements
    │   │   ├── MobileHeader.tsx# Top responsive navbar header for smaller viewports
    │   │   ├── SidebarOverlay.tsx # Click-to-close overlay for mobile side drawers
    │   │   ├── LeftSidebar/    # Primary left nav panel components
    │   │   │   ├── LeftSidebar.tsx
    │   │   │   ├── ModuleProgressCard.tsx
    │   │   │   ├── NavItem.tsx
    │   │   │   └── UserCard.tsx
    │   │   └── RightSidebar/   # Right side cohort chat components
    │   │       ├── ChatComposer.tsx
    │   │       ├── ChatMessageBubble.tsx
    │   │       └── CohortChatPanel.tsx
    │   └── features/           # Feature-specific isolated dashboard components
    │       ├── assignments/    # Submissions, headers, lists & code viewers
    │       │   ├── AssignmentHeader.tsx
    │       │   ├── AssignmentListItem.tsx
    │       │   ├── CodeSnippetViewer.tsx
    │       │   └── SubmissionDropzone.tsx
    │       ├── discussions/    # Forum list items & replies components
    │       │   ├── ThreadListItem.tsx
    │       │   └── ThreadReply.tsx
    │       ├── grades/         # Breakdown grids & summaries
    │       │   ├── GradeBreakdownTable.tsx
    │       │   └── GradeSummaryCard.tsx
    │       ├── leaderboard/    # Row items in the sidebar panel
    │       │   └── LeaderboardRow.tsx
    │       ├── modules/        # Syllabus module cards & lesson lines
    │       │   ├── LessonListItem.tsx
    │       │   └── ModuleCard.tsx
    │       ├── resources/      # Resource display cards
    │       │   └── ResourceCard.tsx
    │       └── schedule/       # Calendar timelines
    │           └── TimelineItem.tsx
    └── pages/                  # Routed top-level page components
        ├── ModulesPage.tsx          # URL: `/modules` (Curriculum view)
        ├── AssignmentsPage.tsx      # URL: `/assignments` (All work)
        ├── AssignmentDetailPage.tsx  # URL: `/assignments/:id` (Coding workspace)
        ├── GradesPage.tsx           # URL: `/grades` (Grade records)
        ├── DiscussionsPage.tsx      # URL: `/discussions` (Threads list)
        ├── DiscussionDetailPage.tsx  # URL: `/discussions/:id` (Thread viewer)
        ├── ResourcesPage.tsx        # URL: `/resources` (Curated link grid)
        └── NotFoundPage.tsx         # Fallback 404 router page
```

---

## ✍️ Development Guide: Where to Edit

If you want to customize or extend the application, follow this guide on which files to modify:

### 1. Updating Seed Data & Mock Databases
If you want to update curriculum syllabus lessons, discussions, resources, grades, or the leaderboard rankings:
👉 **Modify files in `src/data/`** (e.g. `src/data/mockModules.ts` to add modules or lessons, `src/data/mockAssignments.ts` to add tasks).

### 2. Styling, Fonts, & Color Palette
The app leverages **Tailwind CSS v4**. Custom colors are defined using CSS variables and mapped in the theme configuration:
👉 **Modify `src/styles/globals.css`** inside the `@theme` block to update colors or fonts:
```css
@theme {
  --color-primary: #A855F7;  /* Primary theme accent color */
  --color-secondary: #27272A;/* Dark secondary boundaries */
  --color-bg: #121212;       /* Base workspace background */
  --color-text: #E4E4E7;     /* Default text */
}
```

### 3. Creating a New View / Route
To add a new section (e.g., a "Profile" page):
1. **Create the Page component** inside `src/pages/` (e.g., `src/pages/ProfilePage.tsx`).
2. **Register the Route** inside `src/App.tsx`:
   ```tsx
   <Route path="/profile" element={<ProfilePage />} />
   ```
3. **Add the NavItem** to the sidebar inside `src/components/layout/LeftSidebar/LeftSidebar.tsx`:
   ```tsx
   <NavItem to="/profile" icon={<User className="w-4 h-4" />} label="Profile" onClick={onClose} />
   ```

### 4. Customizing UI Components
To change the aesthetic details of badges, buttons, avatars, or progress bars:
👉 **Modify elements in `src/components/ui/`**.

---

## 🛠️ Installation & Running Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the application.

### 4. Build for Production
Compiles TypeScript and creates optimized assets in the `/dist` folder:
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```
