/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8C0D18",
        "accent-blue": "#A9DCE6",
        "accent-blue-dark": "#316069",
        charcoal: "#1F1F1F",
        "background-light": "#F8F6F6",
        "background-dark": "#211112",
        "off-white": "#F7F7F7",
        "sky-blue": "#A9DCE6",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Lora'", "serif"],
      },
    },
  },
  plugins: [],
}
