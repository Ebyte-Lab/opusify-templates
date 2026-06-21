import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        'accent-red': 'var(--accent-red)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
