import type { Lesson } from '../types/lesson';

export const TUTOR_AVATAR = 'https://picsum.photos/seed/tutor/100/100';

export const lessonsData: Lesson[] = [
  {
    slug: 'color-theory',
    moduleLabel: 'Module 1',
    topicLabel: 'Visual Design Fundamentals',
    title: 'Color Theory & Contrast',
    tutorName: 'Dr. Elena Rostova',
    tutorAvatarUrl: TUTOR_AVATAR,
    readMinutes: 8,
    hasVideo: true,
    videoThumbnailUrl: 'https://picsum.photos/seed/colorvid/800/450',
    nextLessonSlug: 'interaction-design',
    body: [
      {
        type: 'lead',
        text: 'Color is one of the most powerful tools in a designer\'s arsenal. It can evoke emotion, establish brand identity, and draw attention to crucial interface elements.'
      },
      {
        type: 'paragraph',
        text: 'However, in a minimalist layout, color must be used with extreme discipline. When everything is white, grey, or black, a single splash of color becomes a beacon. That color should denote action, progress, or importance, rather than mere decoration.'
      },
      {
        type: 'heading',
        text: 'The Rule of Contrast'
      },
      {
        type: 'paragraph',
        text: 'To ensure accessibility, contrast is non-negotiable. Web Content Accessibility Guidelines (WCAG) require a contrast ratio of at least 4.5:1 for normal text. This is why light themes use very dark grey instead of medium grey for body text, and why primary action buttons use highly saturated backgrounds with white text.'
      },
      {
        type: 'quote',
        text: 'Color does not add a pleasant quality to design—it reinforces it.',
        author: 'Pierre Bonnard'
      },
      {
        type: 'paragraph',
        text: 'Using too many colors creates visual noise, which defeats the purpose of minimalist UI. Stick to a primary brand color, a secondary neutral shade for backgrounds, and a dark color for text.'
      },
      {
        type: 'quiz',
        quiz: {
          id: 'q-color-1',
          prompt: 'What is the primary role of color in a minimalist interface?',
          options: [
            { id: 'opt-color-a', label: 'To make the website look colorful and exciting.', correct: false },
            { id: 'opt-color-b', label: 'To act as a functional signifier for interactions and hierarchy.', correct: true },
            { id: 'opt-color-c', label: 'To hide parts of the page that are less important.', correct: false }
          ],
          correctFeedback: 'Correct! In minimalist design, color is a functional tool used to guide interaction and focus.',
          incorrectFeedback: 'Incorrect. Color should be used purposefully, not just for decoration or excitement.'
        }
      }
    ]
  },
  {
    slug: 'interaction-design',
    moduleLabel: 'Module 2',
    topicLabel: 'Interaction Fundamentals',
    title: 'Interaction Design & Feedback',
    tutorName: 'Dr. Elena Rostova',
    tutorAvatarUrl: TUTOR_AVATAR,
    readMinutes: 10,
    hasVideo: true,
    videoThumbnailUrl: 'https://picsum.photos/seed/interactvid/800/450',
    prevLessonSlug: 'color-theory',
    nextLessonSlug: 'principles-of-minimalist-design',
    body: [
      {
        type: 'lead',
        text: 'Interaction design is the art of creating dialogue between users and products. When a user clicks a button, hovers over a link, or swipes a card, the system must reply instantly.'
      },
      {
        type: 'paragraph',
        text: 'This dialogue is facilitated through micro-interactions: small animations, state changes, or sound effects that confirm the user\'s action. In a minimalist environment, these details must be subtle and clean.'
      },
      {
        type: 'heading',
        text: 'Affordances and Signifiers'
      },
      {
        type: 'paragraph',
        text: 'An affordance is what an object can do. A button affords clicking. A signifier is the visual cue that tells us this affordance exists—like a subtle shadow, a hover transition, or an underlined link. Without clear signifiers, minimalist interfaces become guessing games.'
      },
      {
        type: 'quote',
        text: 'Design is not just what it looks like and feels like. Design is how it works.',
        author: 'Steve Jobs'
      },
      {
        type: 'paragraph',
        text: 'By providing smooth CSS transitions and clear hover states, we give users confidence. They learn that the interface is responsive, alive, and ready for their input.'
      },
      {
        type: 'quiz',
        quiz: {
          id: 'q-interact-1',
          prompt: 'What is the purpose of a signifier in interaction design?',
          options: [
            { id: 'opt-interact-a', label: 'To block users from performing wrong actions.', correct: false },
            { id: 'opt-interact-b', label: 'To visually indicate that an element is interactive and how it behaves.', correct: true },
            { id: 'opt-interact-c', label: 'To animate the logo when the page loads.', correct: false }
          ],
          correctFeedback: 'Correct! Signifiers tell the user how to interact with elements.',
          incorrectFeedback: 'Incorrect. Try again—a signifier is a visual indicator of interactive possibilities.'
        }
      }
    ]
  },
  {
    slug: 'principles-of-minimalist-design',
    moduleLabel: 'Module 3',
    topicLabel: 'Visual Hierarchy',
    title: 'The Principles of Minimalist Design',
    tutorName: 'Dr. Elena Rostova',
    tutorAvatarUrl: TUTOR_AVATAR,
    readMinutes: 12,
    hasVideo: true,
    videoThumbnailUrl: 'https://picsum.photos/seed/lessonvid/800/450',
    prevLessonSlug: 'interaction-design',
    body: [
      {
        type: 'lead',
        text: 'Minimalism is not a lack of something. It is simply the perfect amount of something. In digital interfaces, this philosophy translates into an aggressive curation of elements, ensuring that only what is absolutely necessary remains on the screen.'
      },
      {
        type: 'paragraph',
        text: 'When we design for learning, cognitive load is our primary enemy. Every unnecessary border, every extra color, and every decorative element competes for the learner\'s attention. By stripping away the superfluous, we elevate the essential. This isn\'t just an aesthetic choice; it\'s a pedagogical one.'
      },
      {
        type: 'heading',
        text: 'The Power of Whitespace'
      },
      {
        type: 'paragraph',
        text: 'Whitespace, or negative space, is the canvas upon which our typography and imagery live. It is not "empty" space; it is active space that provides breathing room and guides the eye. Think of it as the silence between musical notes—without it, there is only noise.'
      },
      {
        type: 'quote',
        text: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
        author: 'Antoine de Saint-Exupéry'
      },
      {
        type: 'paragraph',
        text: 'By increasing margins and padding around text blocks, we reduce visual fatigue. The user\'s eye doesn\'t have to work as hard to track from the end of one line to the beginning of the next. Notice how this very page utilizes narrow columns to optimize the line length (ideally between 45 to 75 characters per line).'
      },
      {
        type: 'quiz',
        quiz: {
          id: 'q-minimal-1',
          prompt: 'What is the primary benefit of whitespace in a learning interface?',
          options: [
            { id: 'opt-minimal-a', label: 'It makes the page look modern and trendy.', correct: false },
            { id: 'opt-minimal-b', label: 'It reduces cognitive load and provides visual breathing room.', correct: true },
            { id: 'opt-minimal-c', label: 'It allows for larger advertisements to be placed later.', correct: false }
          ],
          correctFeedback: 'Correct! Whitespace decreases visual clutter and helps the brain parse content faster.',
          incorrectFeedback: 'Incorrect. While it may look modern, its primary benefit is lowering cognitive load.'
        }
      },
      {
        type: 'heading',
        text: 'Typography as Interface'
      },
      {
        type: 'paragraph',
        text: 'In minimalist design, typography often does the heavy lifting. When you remove icons, borders, and background colors, the text itself becomes the primary structural element of the interface. This requires a strong typographic hierarchy.'
      },
      {
        type: 'paragraph',
        text: 'Using contrasting font families—such as a geometric sans-serif for headings (like Poppins) and a highly legible serif for body copy (like Lora)—creates clear distinctions between structural elements and content elements. Size, weight, and color (using shades of dark grey rather than pure black) further define this hierarchy without adding clutter.'
      }
    ]
  }
];
