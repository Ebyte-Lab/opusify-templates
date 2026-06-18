import { LunchMenuItem } from '../types/lunch';

export const mockLunchMenu: LunchMenuItem[] = [
  {
    day: 'Monday',
    breakfast: 'Warm Oatmeal with Blueberries & Honey',
    lunch: 'Turkey & Cheddar Pinwheels, Baby Carrots with Hummus, Apple Slices',
    allergens: ['Dairy', 'Gluten'],
  },
  {
    day: 'Tuesday',
    breakfast: 'Fresh Baked Apple Cinnamon Muffins & Banana',
    lunch: 'Baked Crispy Chicken Tenders, Steamed Broccoli Florets, Roasted Sweet Potato Cubes',
    allergens: ['Gluten'],
  },
  {
    day: 'Wednesday',
    breakfast: 'Creamy Greek Yogurt Parfait with Granola & Strawberries',
    lunch: 'Soft Beef Tacos, Brown Rice, Sweet Corn, Fresh Pico de Gallo',
    allergens: ['Dairy'],
  },
  {
    day: 'Thursday',
    breakfast: 'Whole Grain Waffles with Maple Syrup & Orange Slices',
    lunch: 'Classic Macaroni & Cheese, Crisp Green Beans, Melon Medley',
    allergens: ['Gluten', 'Dairy'],
  },
  {
    day: 'Friday',
    breakfast: 'Scrambled Eggs, Whole Wheat Toast, Mixed Berries',
    lunch: 'Chunky Pepperoni or Three-Cheese Pizza, Garden Salad with Ranch, Fruit Slushy',
    allergens: ['Gluten', 'Dairy'],
  },
];
