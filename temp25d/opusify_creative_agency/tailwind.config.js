// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--color-bg)',
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        text:      'var(--color-text)',
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' },   '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0%)' } },
      },
      animation: {
        'marquee':  'marquee 15s linear infinite',
        'marquee2': 'marquee2 15s linear infinite',
      },
    },
  },
  plugins: [],
}
