/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@aleks-ey/dynamic-app-builder/src/**/*.{js,jsx}",
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/, // Include all possible grid-cols values
    },
    {
      pattern: /gap-(1|2|3|4|5|6|7|8|9|10|11|12)/, // Include all possible gap values
    },
  ],
  theme: {
    extend: {
      colors: {
        "base-dark": "#404040",
        "base-light": "#E2E2E2",
        main: "#AF0404",
        accent: "#141313",
        "sky-blue": "#61dbfb",
      },
      fontFamily: {
        florisha: ["florishaBold"],
        montserrat: ["Montserat"],
      },
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      fadeOut: {
        "0%": { opacity: 1 },
        "100%": { opacity: 0 },
      },
      slideLeft: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideRight: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideUp: {
        "0%": { transform: "translateY(100%)" },
        "100%": { transform: "translateY(0)" },
      },
      slideDown: {
        "0%": { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(0)" },
      },
    },
  },
  plugins: [],
};
