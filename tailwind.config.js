/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: { 
      width: {
        'custom-40': '40rem',
      },
    },
  },
  darkSelector: '.dark-mode',
  plugins: [],
}

