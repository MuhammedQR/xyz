import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        brand: {
          50: '#e8f7ff',
          100: '#c2eaff',
          200: '#99ddff',
          300: '#66cdff',
          400: '#33bbff',
          500: '#009fe6', /* primary */
          600: '#007ab4',
          700: '#005c86',
          800: '#003f59',
          900: '#002a3d'  /* dark */
        },
        accent: {
          500: '#f59e0b' /* amber for safety accents */
        }
      }
    },
  },
  plugins: [],
} satisfies Config
