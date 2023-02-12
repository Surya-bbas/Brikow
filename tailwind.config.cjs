/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'customPrimary': '#EEE9DA',
        'customSecondary': '#6096B4',
        'custom3':'#93BFCF',
        'custom4':'#BDCDD6'
      },
    },
  },
  plugins: [],
}
