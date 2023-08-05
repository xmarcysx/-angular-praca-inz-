/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "image-dark": "url('src/assets/images/backgroundDark.jpg')",
        "image-light": "url('src/assets/images/backgroundLight.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
