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
        bg: 'var(--bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        borderCol: 'var(--border)'
      },
      fontFamily: {
        heading: ['"Archivo Black"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config
