import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F5F5',
        primary: '#0F4C81',
        secondary: '#D9E2EC',
        text: '#102A43',
      },
      fontFamily: {
        heading: ['"Montserrat"', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
