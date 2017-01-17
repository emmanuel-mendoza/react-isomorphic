const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

console.log(path.resolve('.'));

const nodeModules = fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });

const serverConfig = {
  name: 'server',

  target: 'node',

  entry: './server.babel',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  context: __dirname,

  node: {
      __dirname: true
  },

  externals: nodeModules,
  
  devtool: 'source-map',

  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = serverConfig;