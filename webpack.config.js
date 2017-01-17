const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });

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

  externals: nodeModules,
  
  devtool: 'source-map',

  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = clientConfig;