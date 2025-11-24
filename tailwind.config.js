/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
      },
      colors: {
        primary: {
          blue: {
            50: 'var(--color-blue-50)',
            100: 'var(--color-blue-100)',
            200: 'var(--color-blue-200)',
            300: 'var(--color-blue-300)',
            400: 'var(--color-blue-400)',
            500: 'var(--color-blue-500)',
            600: 'var(--color-blue-600)',
            700: 'var(--color-blue-700)',
            800: 'var(--color-blue-800)',
            900: 'var(--color-blue-900)',
          },
          green: {
            50: 'var(--color-green-50)',
            100: 'var(--color-green-100)',
            200: 'var(--color-green-200)',
            300: 'var(--color-green-300)',
            400: 'var(--color-green-400)',
            500: 'var(--color-green-500)',
            600: 'var(--color-green-600)',
            700: 'var(--color-green-700)',
            800: 'var(--color-green-800)',
            900: 'var(--color-green-900)',
          },
        },
        neutral: {
          white: 'var(--color-white)',
          gray: {
            50: 'var(--color-gray-50)',
            100: 'var(--color-gray-100)',
            200: 'var(--color-gray-200)',
            300: 'var(--color-gray-300)',
            400: 'var(--color-gray-400)',
            500: 'var(--color-gray-500)',
            600: 'var(--color-gray-600)',
            700: 'var(--color-gray-700)',
            800: 'var(--color-gray-800)',
            900: 'var(--color-gray-900)',
          },
        },
      },
    },
  },
  plugins: [],
}

