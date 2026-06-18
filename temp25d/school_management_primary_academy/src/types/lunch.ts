export interface LunchMenuItem {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  breakfast: string;
  lunch: string;
  allergens: string[];
}
