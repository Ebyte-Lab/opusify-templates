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
        chrome: '#131921',
        chromeDark: '#232F3E',
        chromeFooterBtn: '#37475A',
        chromeFooterBtnHover: '#485769',
        cta: '#FFD814',
        ctaHover: '#F7CA00',
        ctaBorder: '#FCD200',
        bundleCta: '#FFA41C',
        bundleCtaHover: '#FA8900',
        bundleCtaBorder: '#FF8F00',
        priceAccent: '#B12704',
        bestSellerBadge: '#C45500',
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', 'sans-serif'],
        body: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
