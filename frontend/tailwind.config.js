/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1C1B1D',
        link: '#D282A6',
        on: '#F58D9B',
      },
    },
  },
  plugins: [],
}
