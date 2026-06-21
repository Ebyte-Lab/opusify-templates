import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        primary: '#14B8A6', // Teal 500
        secondary: '#F1F5F9', // Slate 100
        text: '#334155', // Slate 700
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
