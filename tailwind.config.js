/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#668968",
        primaryDark: "#283D29",
        secondary: "#cc9441",
        secondaryDark: "#77623E",
        muted: "#D8D8D6",
        bgblacktp: 'rgba(255, 255, 255, 0.69)',
      },
      boxShadow: {
        '3xl': '1px 1px 8px 6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
