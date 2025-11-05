/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF1F6',
          100: '#DADFEA',
          500: '#1C274C',
          700: '#121A33',
        },
        accent: {
          100: '#F2E8DA',
          400: '#D4B690',
          600: '#B38B59',
        },
        surface: '#F6F1E7',
        on: '#1F2328',
        success: '#1E6F5C',
        warn: '#B08900',
        error: '#8B1E3F',
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif TC', 'serif'],
      },
      fontSize: {
        display: ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        h1: ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 6px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 120ms ease-in-out',
        bounce: 'bounce 200ms ease-out',
        fadeIn: 'fadeIn 300ms ease-out',
        fadeOut: 'fadeOut 300ms ease-in',
      },
    },
  },
  plugins: [],
}
