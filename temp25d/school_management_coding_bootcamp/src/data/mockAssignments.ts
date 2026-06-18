import type { Assignment } from '../types/assignment';

export const mockAssignments: Assignment[] = [
  {
    id: 'e-commerce-api',
    title: 'Capstone Project: E-Commerce API',
    description: 'Build a robust RESTful API using Node.js, Express, and PostgreSQL. Implement JWT authentication, role-based access control, and complete test suites with Jest and Supertest.',
    moduleId: 'm2',
    dueDate: '2026-06-20T23:59:59Z', // 2 days from local time 2026-06-18
    status: 'due',
    codeExample: {
      filename: 'controllers/orderController.js',
      language: 'javascript',
      code: `const Order = require('../models/Order');
const asyncHandler = require('../middleware/async');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
});`
    }
  },
  {
    id: 'custom-hook-localstorage',
    title: 'Custom Hooks: useLocalStorage',
    description: 'Create a custom hook named useLocalStorage that synchronizes state with browser localStorage. It should handle errors, supports functional updates, and be fully typed in TypeScript.',
    moduleId: 'm3',
    dueDate: '2026-06-23T23:59:59Z', // 5 days from local time
    status: 'due',
    codeExample: {
      filename: 'hooks/useLocalStorage.ts',
      language: 'typescript',
      code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`
    }
  },
  {
    id: 'database-schema-design',
    title: 'Postgres Database Schema Design',
    description: 'Design a normalized relational database schema for a blog platform with authors, posts, comments, tags, and categories. Submit a SQL migration file containing all tables, constraints, indexes, and sample seeds.',
    moduleId: 'm2',
    dueDate: '2026-06-15T23:59:59Z', // due 3 days ago
    status: 'submitted',
    codeExample: {
      filename: 'db/schema.sql',
      language: 'sql',
      code: `-- Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts Table with Foreign Key
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
    }
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website Layout',
    description: 'Develop your professional portfolio website. Showcase your projects, skills, and resume. The design must be fully responsive, accessible (WCAG AA), and optimize core web vitals.',
    moduleId: 'm1',
    dueDate: '2026-06-08T23:59:59Z', // due 10 days ago
    status: 'graded'
  },
  {
    id: 'express-rest-api',
    title: 'Simple REST API using Node & Express',
    description: 'Build a server-side JSON API for managing a bookstore. Implement endpoints for GET, POST, PUT, and DELETE. Use memory array storage for mock storage.',
    moduleId: 'm2',
    dueDate: '2026-06-03T23:59:59Z', // due 15 days ago
    status: 'graded'
  },
  {
    id: 'typescript-calculator',
    title: 'TypeScript Command-line Calculator',
    description: 'Implement a CLI-based calculator program in TypeScript. Support operations like add, subtract, multiply, divide, power, and square root. Use prompts for interactive input.',
    moduleId: 'm1',
    dueDate: '2026-06-14T23:59:59Z', // due 4 days ago
    status: 'overdue'
  }
];
