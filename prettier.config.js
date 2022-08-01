/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  trailingComma: "all",
  plugins: [require("prettier-plugin-tailwindcss")],
};
