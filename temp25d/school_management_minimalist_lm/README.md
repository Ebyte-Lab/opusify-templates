# Lumina - Minimalist LMS Portal

Lumina is a premium, distraction-free React + TypeScript learning management system template built using Vite, React Router v6, and Tailwind CSS. It is fully responsive, accessible, and structured for production.

## Features

- **Distraction-Free Focus Mode**: Hides navigation headers and chrome while reading. Fades the header back into view only when the mouse cursor approaches the top edge of the viewport.
- **Picture-in-Picture Video Player**: Lessons with video content automatically pop out to float in the bottom-right corner when the main video container scrolls out of view.
- **Reading Progress Bar**: Dynamically tracks scroll progress and displays progress indicators.
- **Interactive Quizzes**: Standalone and inline quiz widgets that evaluate answers, display custom green/red feedback, and update course completion status.
- **State Persistence**: Saves completed lessons, quiz scores, and preferences to browser LocalStorage.
- **Path Aliases**: Uses clean path aliases (`@/*` pointing to `src/*`) to avoid deep relative imports.

---

## Directory Structure

```
src/
  components/
    layout/
      AppHeader.tsx        # Logo, Nav links, Focus Mode Toggle, Responsive Drawer
      AppLayout.tsx        # Outer Shell: wraps ReadingProgressBar, Header, and Page Outlet
      FocusModeToggle.tsx  # Focus Mode toggle switch button
      ReadingProgressBar.tsx # Horizontal scroll position tracker bar
    lesson/
      LessonHero.tsx        # Eyebrow module labels, Title, and Tutor byline
      LessonVideoPlayer.tsx # IntersectionObserver-driven picture-in-picture player
      LessonArticle.tsx     # Discriminated union block renderer for text/heading/quotes/quizzes
      InlineQuizBlock.tsx   # Reusable quiz card widget used inside lesson bodies
      LessonFooterNav.tsx   # Sibling navigation buttons and Check Complete mark action
    syllabus/
      ModuleAccordion.tsx   # Syllabus module accordion fold widget
      LessonListItem.tsx    # Lesson item checklist listing titles and read times
    quiz/
      QuizCard.tsx          # Card representing a quiz with score badges
      QuizOption.tsx        # Styled radio label inputs for quiz taking
    account/
      ProfileCard.tsx       # Learner statistics profile and progress reset
      PreferenceToggleRow.tsx # Slide toggle row for options settings
    ui/
      Avatar.tsx            # Circle image utility
      Badge.tsx             # Pill tag utility
      Button.tsx            # Styled action button utility
      Divider.tsx           # Slate border divider utility
  hooks/
    useFocusMode.ts         # Tracks mouse cursor near header viewport boundary
    usePictureInPicture.ts  # intersection-observer trigger for floating mini-video
    useQuiz.ts              # Abstract quiz selection, check, and reset state machine
    useReadingProgress.ts   # Window scroll distance percentage hook
  data/
    lessons.ts              # Lesson mock content databases
    syllabus.ts             # Course syllabus outline catalog
  types/
    lesson.ts               # Discriminated Union blocks and interfaces types
  context/
    CourseContext.tsx       # Global state provider for progress, quizzes, and theme preferences
  pages/
    LessonPage.tsx          # Lesson detailed content template view
    SyllabusPage.tsx        # Main syllabus index page
    QuizzesPage.tsx         # Catalog page list of course quizzes
    QuizDetailPage.tsx      # Standalone quiz detail taking page
    AccountPage.tsx         # User profile stats and toggles settings page
```

---

## Getting Started

### Local Development

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open the browser at the local URL (usually `http://localhost:5173`).

### Build for Production

Compile and bundle the production assets:
```bash
npm run build
```

The output assets will be created under the `dist/` directory.

---

## How to Add a New Lesson

1. **Define the Lesson Data**:
   Open `src/data/lessons.ts` and add a new lesson object into the `lessonsData` array. Make sure you follow the `Lesson` interface structure:
   ```ts
   {
     slug: 'your-new-lesson-slug',
     moduleLabel: 'Module X',
     topicLabel: 'Topic Category',
     title: 'Title of the Lesson',
     tutorName: 'Dr. Elena Rostova',
     tutorAvatarUrl: TUTOR_AVATAR,
     readMinutes: 10,
     hasVideo: true,
     videoThumbnailUrl: 'https://picsum.photos/seed/yourseed/800/450',
     prevLessonSlug: 'previous-lesson-slug',
     nextLessonSlug: 'next-lesson-slug',
     body: [
       { type: 'lead', text: 'Lead text...' },
       { type: 'paragraph', text: 'Paragraph text...' },
       { type: 'heading', text: 'Sub-heading title' },
       { type: 'quote', text: 'Inspirational quote...', author: 'Author Name' },
       {
         type: 'quiz',
         quiz: {
           id: 'q-new-1',
           prompt: 'Your question prompt?',
           options: [
             { id: 'opt-a', label: 'Option A', correct: false },
             { id: 'opt-b', label: 'Option B (Correct)', correct: true }
           ],
           correctFeedback: 'Great job!',
           incorrectFeedback: 'Try reading the section again.'
         }
       }
     ]
   }
   ```

2. **Add to the Syllabus Outline**:
   Open `src/data/syllabus.ts` and add the lesson under the appropriate module object:
   ```ts
   {
     slug: 'your-new-lesson-slug',
     title: 'Title of the Lesson',
     readMinutes: 10
   }
   ```

3. **Update Sibling Navigation Links**:
   Make sure you link the `prevLessonSlug` and `nextLessonSlug` in your surrounding lessons inside `src/data/lessons.ts` to form a cohesive loop.
