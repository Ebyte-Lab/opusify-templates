import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          400: '#c084fc',
          500: '#a855f7',  // Primary purple
          600: '#9333ea',
          700: '#7e22ce',
          900: '#581c87',
        },
        surface: {
          DEFAULT: '#0f0f13',   // Page background
          card:    '#17171f',   // Card background
          elevated:'#1f1f2a',   // Elevated panels
          border:  '#2a2a38',   // Dividers
        },
        accent: {
          teal:   '#2dd4bf',
          amber:  '#fbbf24',
          rose:   '#fb7185',
          indigo: '#818cf8',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
} satisfies Config;
