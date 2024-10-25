/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['var(--font-roboto)'],
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          //Blue
          50: '#C7C2FF',
          75: '#B4ADFF',
          100: '#A59DFF',
          200: '#968DFF',
          300: '#887DFF',
          400: '#796DFF',
          500: '#6B60E7',
          600: '#5D53CF',
          700: '#5046B8',
          800: '#4139A0',
          900: '#2E2680',
        },
        grey: {
          //Shades
          75: '#FFFFFF',
          100: '#C0C0C5',
          200: '#ADACB5',
          300: '#9B9AA6',
          400: '#8A8998',
          500: '#787689',
          600: '#615F6D',
          700: '#494851',
          800: '#302F34',
          900: '#181717',
          1000: '#141313',
          1100: '#111010',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
