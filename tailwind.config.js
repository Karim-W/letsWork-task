const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xxs: "300px",
      xs: "475px",
      ...defaultTheme.screens,
      retina: "2200px",
      UHD: "3500px",
    },
  },
  plugins: [],
};
