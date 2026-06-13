/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F4F0E7",
        brand: {
          DEFAULT: "#1B5E3F",
          dark: "#14502F",
        },
      },
    },
  },
  plugins: [],
};
