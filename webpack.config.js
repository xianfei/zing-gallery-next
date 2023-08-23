var webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    main: "./src/static/main.js"
  },
  output: {
    path: __dirname + "/build",
    publicPath: "./",
    filename: "[name].js"
  }
}