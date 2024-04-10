/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/*.vue", "./src/components/*.vue" , "./src/App.vue"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss'),

    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}

