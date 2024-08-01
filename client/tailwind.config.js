import { defaults } from "autoprefixer";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        "primary-dark": "#e2e8f0",
      },
      backgroundColor: {
        "container-dark": "#17153B",
        "primary-dark": "#282830",
        "secondary-dark": "#2b2b33"
      },
    },
  },
  plugins: [],
};
