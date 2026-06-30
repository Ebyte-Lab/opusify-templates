import { CalendarEvent } from '../../types/common.types';
import { mockCalendarEvents } from '../mock/calendar.mock';
import { delay } from './client';

let localEvents = [...mockCalendarEvents];

export const calendarApi = {
  getAll: async (): Promise<CalendarEvent[]> => {
    await delay(500);
    return [...localEvents];
  },

  create: async (payload: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
    await delay(600);
    const newEvent: CalendarEvent = {
      ...payload,
      id: `evt-${Date.now()}`
    };
    localEvents.push(newEvent);
    return newEvent;
  },

  delete: async (id: string): Promise<void> => {
    await delay(400);
    localEvents = localEvents.filter(e => e.id !== id);
  }
};
