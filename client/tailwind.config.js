/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "scale-up-fade-out": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "15%": { opacity: "1", transform: "scale(1)" },
          "60%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.1)" },
        },
      },
      backgroundColor: {
        primary: "#3797F0",
      },
    },
  },
  plugins: [],
};
