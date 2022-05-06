const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Virtual Keyboard',
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
};
