/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
      spacing: {
        // Add custom spacing values
      },
      // Add other theme extensions
    },
  },
  plugins: [
    // Add any plugins here
  ],
}
