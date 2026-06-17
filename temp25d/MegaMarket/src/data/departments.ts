import type { DepartmentColumn } from '../types/product';

export const departmentColumns: DepartmentColumn[] = [
  {
    title: 'Electronics',
    links: [
      'Computers & Accessories',
      'TV & Video',
      'Cell Phones & Accessories',
      'Cameras & Photography',
      'Video Games'
    ]
  },
  {
    title: 'Home & Kitchen',
    links: [
      'Kitchen & Dining',
      'Furniture',
      'Bedding',
      'Bath',
      'Home Décor'
    ]
  },
  {
    title: 'Clothing & Shoes',
    links: [
      "Women's Fashion",
      "Men's Fashion",
      "Girls' Fashion",
      "Boys' Fashion",
      'Luggage'
    ]
  }
];

export const promoBlock = {
  img: 'https://picsum.photos/seed/promo/200/200',
  title: 'Tech Week Sale',
  description: 'Up to 40% off top electronics brands.',
  link: '#',
  linkText: 'Shop now >'
};
export const allCategories = ['All', 'Electronics', 'Computers', 'Home'];
