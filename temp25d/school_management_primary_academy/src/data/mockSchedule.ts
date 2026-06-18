import { ClassSession, Subject } from '../types/schedule';

export const mockClassSessions: Record<string, ClassSession[]> = {
  'leo-miller': [
    // Monday
    { id: 'l1', subject: 'Math', teacher: 'Mrs. Gable', room: 'Room 101', day: 'Mon', startTime: '09:00 AM', color: 'blue' },
    { id: 'l2', subject: 'Reading', teacher: 'Mrs. Gable', room: 'Library', day: 'Mon', startTime: '11:00 AM', color: 'purple' },
    { id: 'l3', subject: 'Science', teacher: 'Dr. Sparks', room: 'Lab B', day: 'Mon', startTime: '01:00 PM', color: 'green' },
    // Tuesday
    { id: 'l4', subject: 'Art', teacher: 'Mr. Davis', room: 'Studio', day: 'Tue', startTime: '09:00 AM', color: 'primary' },
    { id: 'l5', subject: 'Math', teacher: 'Mrs. Gable', room: 'Room 101', day: 'Tue', startTime: '11:00 AM', color: 'blue' },
    { id: 'l6', subject: 'P.E.', teacher: 'Coach Brick', room: 'Gym', day: 'Tue', startTime: '01:00 PM', color: 'orange' },
    // Wednesday
    { id: 'l7', subject: 'Reading', teacher: 'Mrs. Gable', room: 'Library', day: 'Wed', startTime: '09:00 AM', color: 'purple' },
    { id: 'l8', subject: 'Music', teacher: 'Ms. Harmony', room: 'Band Rm', day: 'Wed', startTime: '11:00 AM', color: 'pink' },
    { id: 'l9', subject: 'Science', teacher: 'Dr. Sparks', room: 'Lab B', day: 'Wed', startTime: '01:00 PM', color: 'green' },
    // Thursday
    { id: 'la', subject: 'Math', teacher: 'Mrs. Gable', room: 'Room 101', day: 'Thu', startTime: '09:00 AM', color: 'blue' },
    { id: 'lb', subject: 'P.E.', teacher: 'Coach Brick', room: 'Gym', day: 'Thu', startTime: '11:00 AM', color: 'orange' },
    { id: 'lc', subject: 'Music', teacher: 'Ms. Harmony', room: 'Band Rm', day: 'Thu', startTime: '01:00 PM', color: 'pink' },
    // Friday
    { id: 'ld', subject: 'Reading', teacher: 'Mrs. Gable', room: 'Library', day: 'Fri', startTime: '09:00 AM', color: 'purple' },
    { id: 'le', subject: 'Art', teacher: 'Mr. Davis', room: 'Studio', day: 'Fri', startTime: '11:00 AM', color: 'primary' },
    { id: 'lf', subject: 'Early Release', teacher: 'None', room: 'Home', day: 'Fri', startTime: '01:00 PM', color: 'gray' },
  ],
  'mia-miller': [
    // Monday
    { id: 'm1', subject: 'Storytime', teacher: 'Miss Lily', room: 'Carpet Area', day: 'Mon', startTime: '09:00 AM', color: 'purple' },
    { id: 'm2', subject: 'Nap Time', teacher: 'Miss Lily', room: 'Nap Room', day: 'Mon', startTime: '11:00 AM', color: 'gray' },
    { id: 'm3', subject: 'Sandbox', teacher: 'Miss Lily', room: 'Playground', day: 'Mon', startTime: '01:00 PM', color: 'primary' },
    // Tuesday
    { id: 'm4', subject: 'Music', teacher: 'Ms. Harmony', room: 'Band Rm', day: 'Tue', startTime: '09:00 AM', color: 'pink' },
    { id: 'm5', subject: 'Playground', teacher: 'Miss Lily', room: 'Courtyard', day: 'Tue', startTime: '11:00 AM', color: 'green' },
    { id: 'm6', subject: 'Drawing', teacher: 'Miss Lily', room: 'Carpet Area', day: 'Tue', startTime: '01:00 PM', color: 'orange' },
    // Wednesday
    { id: 'm7', subject: 'Storytime', teacher: 'Miss Lily', room: 'Carpet Area', day: 'Wed', startTime: '09:00 AM', color: 'purple' },
    { id: 'm8', subject: 'Sandbox', teacher: 'Miss Lily', room: 'Playground', day: 'Wed', startTime: '11:00 AM', color: 'primary' },
    { id: 'm9', subject: 'Nap Time', teacher: 'Miss Lily', room: 'Nap Room', day: 'Wed', startTime: '01:00 PM', color: 'gray' },
    // Thursday
    { id: 'ma', subject: 'Drawing', teacher: 'Miss Lily', room: 'Carpet Area', day: 'Thu', startTime: '09:00 AM', color: 'orange' },
    { id: 'mb', subject: 'Playground', teacher: 'Miss Lily', room: 'Courtyard', day: 'Thu', startTime: '11:00 AM', color: 'green' },
    { id: 'mc', subject: 'Music', teacher: 'Ms. Harmony', room: 'Band Rm', day: 'Thu', startTime: '01:00 PM', color: 'pink' },
    // Friday
    { id: 'md', subject: 'Storytime', teacher: 'Miss Lily', room: 'Carpet Area', day: 'Fri', startTime: '09:00 AM', color: 'purple' },
    { id: 'me', subject: 'Sandbox', teacher: 'Miss Lily', room: 'Playground', day: 'Fri', startTime: '11:00 AM', color: 'primary' },
    { id: 'mf', subject: 'Early Release', teacher: 'None', room: 'Home', day: 'Fri', startTime: '01:00 PM', color: 'gray' },
  ],
};

export const mockSubjects: Record<string, Subject[]> = {
  'leo-miller': [
    {
      id: 'sub-math',
      name: 'Math',
      teacher: 'Mrs. Jennifer Gable',
      teacherAvatar: 'https://picsum.photos/seed/gable1/100/100',
      room: 'Room 101',
      schedule: 'Mon, Tue, Thu - 09:00 AM | Tue - 11:00 AM',
      currentUnit: 'Introduction to double-digit addition and subtraction',
      materialsNeeded: ['Ruler', 'Pencil case', 'Math workbook Vol. 1'],
      teacherNote: 'Leo is grasping place value concepts very quickly! Please keep practicing subtracting with borrowing at home.',
    },
    {
      id: 'sub-reading',
      name: 'Reading',
      teacher: 'Mrs. Jennifer Gable',
      teacherAvatar: 'https://picsum.photos/seed/gable1/100/100',
      room: 'Library',
      schedule: 'Mon, Wed, Fri - 11:00 AM | Wed - 09:00 AM',
      currentUnit: 'Phonics, compound words, and reading comprehension passages',
      materialsNeeded: ['Primary composition book', 'Highlighters', 'Weekly spelling list'],
      teacherNote: 'Leo is reading with great expression. We are currently focusing on identifying character motivations in our stories.',
    },
    {
      id: 'sub-science',
      name: 'Science',
      teacher: 'Dr. Alan Sparks',
      teacherAvatar: 'https://picsum.photos/seed/sparks1/100/100',
      room: 'Lab B',
      schedule: 'Mon, Wed - 01:00 PM',
      currentUnit: 'Plant life cycles and soil classification',
      materialsNeeded: ['Safety goggles (provided)', 'Colored pencils', 'Science journal'],
      teacherNote: 'Our bean sprout experiment is showing great results! Leo is taking very thorough observations in his journal.',
    },
    {
      id: 'sub-art',
      name: 'Art',
      teacher: 'Mr. Tyler Davis',
      teacherAvatar: 'https://picsum.photos/seed/teacher1/100/100',
      room: 'Studio',
      schedule: 'Tue - 09:00 AM | Fri - 11:00 AM',
      currentUnit: 'Color mixing and landscape watercolors',
      materialsNeeded: ['Painting smock', 'Sketchbook (9x12)'],
      teacherNote: "Leo did an amazing job helping clean up the art supplies today! He has a great eye for watercolor gradients.",
    },
    {
      id: 'sub-music',
      name: 'Music',
      teacher: 'Ms. Elena Harmony',
      teacherAvatar: 'https://picsum.photos/seed/harmony1/100/100',
      room: 'Band Rm',
      schedule: 'Wed - 11:00 AM | Thu - 01:00 PM',
      currentUnit: 'Basic rhythm structures and introduction to recorder',
      materialsNeeded: ['Standard soprano recorder', 'Music binder'],
      teacherNote: 'We are practicing notes B, A, and G. Encourage Leo to practice "Hot Cross Buns" for five minutes each evening.',
    },
  ],
  'mia-miller': [
    {
      id: 'sub-storytime',
      name: 'Storytime',
      teacher: 'Miss Lily Rose',
      teacherAvatar: 'https://picsum.photos/seed/lily1/100/100',
      room: 'Carpet Area',
      schedule: 'Mon, Wed, Fri - 09:00 AM',
      currentUnit: 'Fables, rhyming structures, and letter sounds',
      materialsNeeded: ['Drawing pad', 'Jumbo crayons'],
      teacherNote: 'Mia loves read-alouds and is excellent at predicting what will happen next in the pictures!',
    },
    {
      id: 'sub-sandbox',
      name: 'Sandbox & Social Play',
      teacher: 'Miss Lily Rose',
      teacherAvatar: 'https://picsum.photos/seed/lily1/100/100',
      room: 'Playground',
      schedule: 'Mon, Wed - 01:00 PM | Wed, Fri - 11:00 AM',
      currentUnit: 'Sharing, teamwork, and sensory motor skills',
      materialsNeeded: ['Sunscreen (labeled)', 'Change of clothes (just in case!)'],
      teacherNote: 'Mia is very polite and shared all the sand buckets with her friends today. Good job, Mia!',
    },
    {
      id: 'sub-drawing',
      name: 'Drawing & Crafts',
      teacher: 'Miss Lily Rose',
      teacherAvatar: 'https://picsum.photos/seed/lily1/100/100',
      room: 'Carpet Area',
      schedule: 'Tue, Thu - 01:00 PM | Thu - 09:00 AM',
      currentUnit: 'Finger painting, paper folding, and basic shapes matching',
      materialsNeeded: ['Safety scissors', 'Glue stick'],
      teacherNote: 'We practiced using safety scissors today. Mia is developing great fine motor control!',
    },
    {
      id: 'sub-music-k',
      name: 'Kindergarten Music',
      teacher: 'Ms. Elena Harmony',
      teacherAvatar: 'https://picsum.photos/seed/harmony1/100/100',
      room: 'Band Rm',
      schedule: 'Tue - 09:00 AM | Thu - 01:00 PM',
      currentUnit: 'Sing-alongs and rhythm egg shakers',
      materialsNeeded: ['Comfortable clothes for dancing'],
      teacherNote: 'Mia is a wonderful singer and always leads the classroom in our morning greeting song.',
    },
  ],
};
