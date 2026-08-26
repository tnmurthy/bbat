/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        railway: {
          navy: '#0b2545',
          blue: '#134074',
          accent: '#0066cc',
          light: '#eef4f8',
          card: '#ffffff',
          dark: '#081c34'
        }
      }
    },
  },
  plugins: [],
}
