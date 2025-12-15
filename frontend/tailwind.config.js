/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // 🌈 DaisyUI theme configuration
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "corporate",
      "emerald",
      "cyberpunk",
      "synthwave",
      "dracula",
      "forest",
      "luxury",
    ],
  },
};
