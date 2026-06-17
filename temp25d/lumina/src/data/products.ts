// src/data/products.ts
import type { Product } from '../types/product';

export const skincareProducts: Product[] = [
  {
    id: 1,
    name: 'Restorative Face Oil',
    desc: 'Jojoba, Rosehip, and Sea Buckthorn',
    price: 48.0,
    subPrice: 40.8,
    img: 'https://picsum.photos/seed/oil1/500/500',
    badges: ['Vegan', 'Cold-Pressed'],
  },
  {
    id: 2,
    name: 'Purifying Clay Mask',
    desc: 'French Green Clay and Matcha',
    price: 32.0,
    subPrice: 27.2,
    img: 'https://picsum.photos/seed/mask1/500/500',
    badges: ['Cruelty-Free'],
  },
  {
    id: 3,
    name: 'Hydrating Mist',
    desc: 'Rosewater and Aloe Vera',
    price: 24.0,
    subPrice: 20.4,
    img: 'https://picsum.photos/seed/mist1/500/500',
    badges: ['Organic', 'Alcohol-Free'],
  },
];

export const supplementProducts: Product[] = [
  {
    id: 4,
    name: 'Super Greens Powder',
    desc: 'Organic Barley Grass, Spirulina, and Chlorella',
    price: 38.0,
    subPrice: 32.3,
    img: 'https://picsum.photos/seed/greens1/500/500',
    badges: ['Organic', 'Gluten-Free'],
  },
  {
    id: 5,
    name: 'Herbal Sleep Complex',
    desc: 'Ashwagandha, Chamomile, and Valerian Root',
    price: 28.0,
    subPrice: 23.8,
    img: 'https://picsum.photos/seed/sleep1/500/500',
    badges: ['Vegan', 'Non-GMO'],
  },
  {
    id: 6,
    name: 'Probiotic Defense',
    desc: '10 Billion CFU + Prebiotic Fiber',
    price: 34.0,
    subPrice: 28.9,
    img: 'https://picsum.photos/seed/probiotic1/500/500',
    badges: ['Dairy-Free', 'Shelf-Stable'],
  },
];

export const bundleProducts: Product[] = [
  {
    id: 7,
    name: 'Radiant Glow Trio',
    desc: 'Face Oil + Clay Mask + Hydrating Mist',
    price: 84.0,
    subPrice: 71.4,
    img: 'https://picsum.photos/seed/glowtrio/500/500',
    badges: ['Best Seller', 'Routine'],
  },
  {
    id: 8,
    name: 'Gut-Skin Harmony Pack',
    desc: 'Probiotic Defense + Super Greens Powder',
    price: 62.0,
    subPrice: 52.7,
    img: 'https://picsum.photos/seed/gutskin/500/500',
    badges: ['Wellness', 'Vegan'],
  },
  {
    id: 9,
    name: 'Daily Balance Set',
    desc: 'Hydrating Mist + Herbal Sleep Complex',
    price: 44.0,
    subPrice: 37.4,
    img: 'https://picsum.photos/seed/dailybal/500/500',
    badges: ['Essentials'],
  },
];

export const giftCardProducts: Product[] = [
  {
    id: 10,
    name: 'Lumina Gift Card - $25',
    desc: 'Delivered instantly by email with redemption instructions.',
    price: 25.0,
    subPrice: 25.0,
    img: 'https://picsum.photos/seed/gift25/500/500',
    badges: ['Digital'],
  },
  {
    id: 11,
    name: 'Lumina Gift Card - $50',
    desc: 'Delivered instantly by email with redemption instructions.',
    price: 50.0,
    subPrice: 50.0,
    img: 'https://picsum.photos/seed/gift50/500/500',
    badges: ['Digital'],
  },
  {
    id: 12,
    name: 'Lumina Gift Card - $100',
    desc: 'Delivered instantly by email with redemption instructions.',
    price: 100.0,
    subPrice: 100.0,
    img: 'https://picsum.photos/seed/gift100/500/500',
    badges: ['Digital', 'Popular'],
  },
  {
    id: 13,
    name: 'Lumina Gift Card - $200',
    desc: 'Delivered instantly by email with redemption instructions.',
    price: 200.0,
    subPrice: 200.0,
    img: 'https://picsum.photos/seed/gift200/500/500',
    badges: ['Digital'],
  },
];
