/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tsparticles/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        bgPrimary1: "#eff6ff",
        bgPrimary2: "#f3e8ff",
      },
    },
  },
  plugins: [require("daisyui")],
};
