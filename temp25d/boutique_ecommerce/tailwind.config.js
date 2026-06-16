/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        primary:   'var(--primary)',
        secondary: 'var(--secondary)',
        text:      'var(--text)',
      },
      fontFamily: {
        heading: ['"Cinzel"', 'serif'],
        body:    ['"Montserrat"', 'sans-serif'],
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        kenBurns: 'kenBurns 20s ease-out infinite alternate',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
