export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        heading: ['"EB Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
};
