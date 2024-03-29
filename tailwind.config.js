/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fredoka"', 'sans-serif']
      }
    },
    backgroundImage: {
      // eslint-disable-next-line quotes
      'sl-logo': "url('../sl.png')",
    }
  },
  plugins: []
};
