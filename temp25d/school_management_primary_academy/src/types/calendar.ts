export interface CalendarEvent {
  id: string;
  date: string; // ISO format "YYYY-MM-DD"
  title: string;
  type: 'holiday' | 'academic' | 'social' | 'sports' | 'other';
  description?: string;
}
