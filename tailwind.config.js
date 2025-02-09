/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory
    "./pages/**/*.{js,ts,jsx,tsx}", // If you have a pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // If you use a components folder
  ],
  theme: {
    extend: {
      // Example: Custom colors or fonts
      colors: {
        primary: "#001E80",
        secondary: "#3A50FF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
