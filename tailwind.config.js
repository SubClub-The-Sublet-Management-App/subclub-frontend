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
        'primary': '#7E49F2',
        'secondary': '#464076',
        'accent': 'F2B705',
        'light-primary': '#8F82F8',
        'light-secondary': '#9994BF',
        'dark-bg':'#170F54'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
