/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
