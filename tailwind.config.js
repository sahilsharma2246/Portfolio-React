/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#030712",       // Slate 950 base
          card: "rgba(15, 23, 42, 0.6)", // Slate 900 with opacity
          border: "rgba(30, 41, 59, 0.8)", // Slate 800
          accent: "#22d3ee",   // Cyan 400
          glow: "#06b6d4",     // Cyan 500
        },
      },
      boxShadow: {
        glow: "0 0 20px -3px rgba(6, 182, 212, 0.2)",
        "glow-lg": "0 0 35px -5px rgba(6, 182, 212, 0.3)",
      },
    },
  },
  plugins: [],
};