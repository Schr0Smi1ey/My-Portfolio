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
        // primary: "#387478",
        // primary: "#66785F",
        // primary: "#3D8D7A",
        primary: "#198068",
        bgPrimary1: "#eff6ff",
        bgPrimary2: "#f3e8ff",
        // primary: "#ffffff",
      },
    },
  },
  plugins: [require("daisyui")],
};
