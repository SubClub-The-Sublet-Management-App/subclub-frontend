/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      height: {
        '30vh': '30vh',
      },
      colors: {
        primary: '#7E49F2',
        secondary: '#464076',
        accent: '#F2B705',
        lightPrimary: '#8F82F8',
        lightSecondary: '#9994BF',
        darkBg: '#170F54',
        lightBg: '#E6EAFF',
        'text-primary': '#123456',
        'text-secondary': '#789abc',
        'text-pretty': '#F2B705',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
