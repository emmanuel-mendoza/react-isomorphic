const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');

const client = {
  name: 'client',
  context: SRC_DIR,
  entry: {
    client: ['react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/index'] },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  target: 'web',
  debug: true,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  node: {
    fs: 'empty'
  },
  bail: false,
  devtool: 'inline-source-map',
  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = [client];
