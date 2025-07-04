/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode toggling
  theme: {
    extend: {
      fontFamily: {
        opensans: ["'Open Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brandBlue: {
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
          light: "#6366f1",
        },
        brandPink: {
          DEFAULT: "#e11d48",
          dark: "#be123c",
          light: "#f43f5e",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-5px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      transitionProperty: {
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      },
    },
  },
  plugins: [],
};
