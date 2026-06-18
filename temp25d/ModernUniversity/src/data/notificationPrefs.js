export const defaultNotificationPrefs = [
  { id: 'grade', category: 'Grade Posted', email: true, push: true, sms: false },
  { id: 'payment', category: 'Payment Due', email: true, push: true, sms: true },
  { id: 'registration', category: 'Registration Opens', email: true, push: true, sms: false },
  { id: 'library', category: 'Library Due Date', email: true, push: false, sms: false },
  { id: 'events', category: 'Campus Events', email: false, push: true, sms: false },
  { id: 'advisor', category: 'Advisor Messages', email: true, push: true, sms: false },
  { id: 'system', category: 'System Announcements', email: true, push: true, sms: false }
];
