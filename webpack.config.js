module.exports = {
  mode: 'production',
  entry: {
    main: "./src/static/main.js"
  },
  output: {
    path: __dirname + "/build",
    publicPath: "./",
    filename: "[name].js"
  }
}