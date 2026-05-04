/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7E4555',
          dark: '#5C323E',
        },
        secondary: '#D4AF37',
        background: '#FFFBF0',
        surface: '#ffffff',
        text: {
          main: '#1f2937',
          muted: '#4b5563',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

