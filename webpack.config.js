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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true
    })
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

const server = {
  name: 'server',
  context: SRC_DIR,
  entry: {
    server: './infra/route-manager'
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  debug: true,
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': false
    })
  ],
  node: {
    process: false
  },
  bail: false,
  externals: fs.readdirSync('node_modules')
    .filter((x) => !x.includes('.bin'))
    .reduce((externals, mod) => {
      externals[mod] = `commonjs ${mod}`;
      return externals;
    }, {}),
  devtool: 'eval'
};

module.exports = [client, server];
