import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#06b6d4',  // Primary teal/cyan — clinical, clean
          600: '#0891b2',
          700: '#0e7490',
          900: '#164e63',
        },
        surface: {
          DEFAULT: '#f8fafc',   // Light page background
          card:    '#ffffff',   // Card background
          elevated:'#f1f5f9',   // Subtle elevated sections
          border:  '#e2e8f0',   // Dividers
          dark:    '#0f172a',   // Dark sidebar
        },
        status: {
          critical: '#ef4444',   // Critical lab, urgent
          warning:  '#f59e0b',   // Needs attention
          stable:   '#10b981',   // Normal / stable
          pending:  '#6366f1',   // Awaiting
          inactive: '#94a3b8',   // Discharged / archived
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],  // Lab values, IDs
      }
    },
  },
  plugins: [],
} satisfies Config
