module.exports = {
  purge: ["./dist/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: { primary: "#121212", secondary: "#1F1F1F" },
      fontFamily: {
        sans: ["Raleway", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
