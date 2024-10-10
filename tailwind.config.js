/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Poppins", "sans-serif"], // Use Poppins for headers
        content: ["sans-serif"], // Use sans-serif for body text
      },
    },
  },
  plugins: [
    require("tailwindcss-filters"), // Add this line if you don't have it yet
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require('tailwind-scrollbar-hide'),
  ],
};
