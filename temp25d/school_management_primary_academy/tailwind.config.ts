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
      },
      fontFamily: {
        heading: ['"Quicksand"', 'sans-serif'],
        body: ['"Varela Round"', 'sans-serif'],
      },
      boxShadow: {
        'chunky': '0 6px 0 0 rgba(0, 0, 0, 0.1)',
        'chunky-hover': '0 4px 0 0 rgba(0, 0, 0, 0.1)',
        'chunky-active': '0 0px 0 0 rgba(0, 0, 0, 0.1)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
