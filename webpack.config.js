const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:  path.resolve('.', 'src', 'index.js'),
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CopyPlugin([
      { from: 'script-*.js' },
      { from: "favicon.ico" },
      { from: "load-script.html"}
    ]),
  ],
};
