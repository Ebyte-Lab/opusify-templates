/** @type {import('tailwindcss').Config} */
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
        heading: ['Lora', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(44, 62, 45, 0.08)',
        float: '0 20px 40px -20px rgba(74, 124, 89, 0.2)',
      },
    },
  },
  plugins: [],
}
