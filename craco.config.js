const path = require("path");
module.exports = {
  mode: process.env.REACT_APP_ENVIRONMENT,
  plugins: [
  ],
  babel: {
    presets: [
      ["@babel/preset-react", { "runtime": "automatic" }]
    ],
    plugins: [],
  },
  output: {
    path: __dirname
  },
  webpack: {
    configure: {},
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  style: {
    postcss: {
      plugins: [],
    },
  },
}
