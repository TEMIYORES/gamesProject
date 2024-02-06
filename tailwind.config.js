/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#150080",
        icon:"#6563FF",
        accent: "#d08642",
        bg: "#fff",
        bgAccent: "#e7e8e9",
        disabled: "#9c9c9c",
        foreground: "#2d264b",
        inputBg:"#F1F5F9"
      },
    },
  },

  safelist: ["bg-[#ff8967]"],
  plugins: [],
};
