/* eslint-disable global-require */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        hover: "#2b2a63",
      },
      width: {
        25: "6.5rem",
      },
      borderWidth: {
        1: "border-width: 1px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
