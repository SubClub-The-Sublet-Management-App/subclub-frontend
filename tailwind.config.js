/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      height: {
        '30vh': '30vh',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

