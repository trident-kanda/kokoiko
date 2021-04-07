module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        googlered: "#de5246",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
