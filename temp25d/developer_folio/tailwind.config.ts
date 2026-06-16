import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        primary:   'var(--primary)',
        secondary: 'var(--secondary)',
        text:      'var(--text)',
      },
      fontFamily: {
        heading: ['"Cal Sans"', 'Inter', 'sans-serif'],
        body:    ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
