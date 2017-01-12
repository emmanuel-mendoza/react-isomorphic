const path    = require('path');
const webpack = require('webpack');

const clientConfig = {
  name: 'client',
  target: 'web',
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'public','static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },

  node: {
    fs: "empty"
  },
  
  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:3000'
    },
    host: '127.0.0.1'
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

const serverConfig = {
  name: 'server',
  target: 'node',
  entry: './server',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
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
  
  devtool: 'source-map',

  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = clientConfig; // , serverConfig];