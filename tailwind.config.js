/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // indigo-500
        secondary: "#8b5cf6", // purple-500
        accent: "#22d3ee", // cyan-400
        background: "#111827", // gray-900
        text: "#f3f4f6", // gray-100
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        sans: ["Orbitron", "sans-serif"],
      },
      scrollSnapType: {
        y: "y mandatory",
      },
      scrollSnapAlign: {
        start: "start",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      // transitionDuration: {
      //   2000: "2000ms",
      // },
    },
  },
  variants: {
    extend: {
      scrollSnapType: ["responsive"],
      scrollSnapAlign: ["responsive"],
    },
  },
  plugins: [],
};
