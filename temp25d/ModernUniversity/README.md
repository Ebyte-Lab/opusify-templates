# 🎓 Modern University Student Portal

A modern, highly interactive, and production-ready Student Portal and Dashboard template built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Key Features

### 1. 📊 Interactive Student Dashboard
* **Dynamic Statistics**: GPA, Active Courses, Balance Due, and Library Loans.
* **Academic Analytics**: Custom radial and donut charts powered by `Recharts` for degree progress.
* **Announcements**: Live alert feed for campus updates and deadlines.
* **Quick Actions**: Shortcuts to book advisor meetings or file maintenance requests.

### 2. 📚 Academics & Scheduling
* **Current Term**: Enrolled courses schedule, timetables, and syllabus tracking.
* **Grades & Progress**: GPA trend graphs, academic term history, and grade reports.
* **Advisor Integration**: Scheduler for advising appointments.

### 3. 💳 Financial Portal
* **Tuition & Balance**: Statement of outstanding fees, payment history, and aid distribution.
* **Payment Simulator**: Visual credit card portal flow for transaction tests.

### 4. 🏕️ Campus Life & Clubs
* **Events Calendar**: Browse and RSVP to upcoming workshops, socials, and activities.
* **Student Organizations**: Interactive directory to filter, search, and join registered clubs.
* **Maintenance Request**: Room and facility repair ticketing forms.

### 5. 📖 Digital Library
* **Catalog Search**: Real-time filters to search textbooks, journals, and media.
* **Loan Tracker**: Overdue book warnings, checkout histories, and reservation lists.

---

## 🛠️ Tech Stack & Dependencies

* **Core Framework**: React 18 + Vite (fast HMR)
* **Routing**: React Router DOM v6
* **Styling**: Tailwind CSS v3
* **Data Visualization**: Recharts (responsive SVG charts)
* **Icons**: Lucide React (consistent SVG icon set)

---

## 📂 File Structure & Editing Guide

```bash
ModernUniversity/
├── src/
│   ├── components/
│   │   ├── layout/                    # Navigation and structure shells
│   │   │   ├── Sidebar.jsx            # Desktop navigation (Edit: background/width)
│   │   │   ├── TopBar.jsx             # Title bar & profile header (Edit: actions/notifs)
│   │   │   ├── MobileHeader.jsx       # Header on small screens (Edit: logo/padding)
│   │   │   ├── MobileOverlay.jsx      # Backdrop for mobile side drawer (Edit: opacity)
│   │   │   └── PageFooter.jsx         # Footer copyright banner (Edit: URLs/year)
│   │   ├── modals/                    # Overlay forms and popups
│   │   │   ├── AdvisorMeetingModal.jsx # Date/time reservation form (Edit: fields)
│   │   │   ├── MaintenanceRequestModal.jsx # Campus repair ticket form (Edit: validations)
│   │   │   ├── ConfirmModal.jsx       # Confirm action dialogue (Edit: buttons/colors)
│   │   │   └── DownloadModal.jsx      # Report/transcript exporter (Edit: formats)
│   │   └── ui/                        # Reusable design system primitives
│   │       ├── StatCard.jsx           # Stats metrics displays (Edit: shadows/animations)
│   │       ├── Badge.jsx              # Status indicator pills (Edit: Tailwind colors)
│   │       ├── ProgressBar.jsx        # Completion progress track (Edit: heights)
│   │       ├── DonutChart.jsx         # SVG radial charts (Edit: thickness/labels)
│   │       ├── TabNav.jsx             # Sub-navigation tab headers (Edit: paddings)
│   │       ├── Toggle.jsx             # Checkbox toggle switches (Edit: dimension/speed)
│   │       ├── EmptyState.jsx         # Fallback search layout (Edit: text/icon)
│   │       ├── SectionHeader.jsx      # Section title layouts (Edit: typography)
│   │       └── NavItem.jsx            # Active link states (Edit: hover actions)
│   ├── context/
│   │   └── UIContext.jsx              # Mobile nav state provider (Edit: add globals)
│   ├── data/                          # Mock database (Edit values to change portal data)
│   │   ├── student.js                 # Profile data (name, GPA, major, avatar)
│   │   ├── navLinks.js                # Sidebar navigation options and icons
│   │   ├── courses.js                 # Active schedules, grades, and rooms
│   │   ├── allTerms.js                # History of GPAs and completed courses
│   │   ├── degreeProgress.js          # Credit graduation criteria limits
│   │   ├── events.js                  # Campus events list and registrations
│   │   ├── clubs.js                   # Active student clubs list and members
│   │   ├── financials.js              # Tuition balances, billing, and aid logs
│   │   ├── libraryBooks.js            # Books database catalog list
│   │   ├── researchDatabases.js       # Academic search links (e.g. JSTOR)
│   │   ├── announcements.js           # Portal dashboard broadcast alerts
│   │   ├── notificationPrefs.js       # SMS/email notification setups
│   │   └── privacyPrefs.js            # Data privacy and directory visibility
│   ├── hooks/
│   │   ├── useAnimatedValue.js        # Count-up value animator (Edit: duration)
│   │   └── usePageTitle.js            # Page header mapping controller (Edit: paths)
│   ├── pages/                         # Core views matching router paths
│   │   ├── DashboardPage.jsx          # Home view aggregating stats, charts, & notices
│   │   ├── AcademicsPage.jsx          # Timetables, GPA calculators, & transcripts
│   │   ├── FinancialsPage.jsx         # Transaction logs and credit card payment
│   │   ├── CampusLifePage.jsx         # Club directory and maintenance ticketing
│   │   ├── LibraryPage.jsx            # Online catalog search & loan tracker
│   │   └── SettingsPage.jsx           # Preferences form controls
│   ├── App.css                        # CSS override declarations
│   ├── index.css                      # Tailwind imports
│   ├── App.jsx                        # Routing and base layout
│   └── main.jsx                       # React mounting entrypoint
├── tailwind.config.js                 # Style theme configurations (Edit: colors/fonts)
├── vite.config.js                     # Vite build and server settings (Edit: port)
├── index.html                         # Document HTML template (Edit: title/SEO)
└── package.json                       # Scripts and project dependencies
```

---

## 💻 Getting Started

### 📋 Prerequisites
Ensure **Node.js (v18+)** and **npm** are installed.

### 🔧 Installation
1. Navigate to the project root:
   ```bash
   cd temp25d/ModernUniversity
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 🏃 Running Locally
```bash
npm run dev
```

### 📦 Production Build
```bash
npm run build
npm run preview
```
