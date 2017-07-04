const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: { configFile: './.eslintrc' }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-import')(),
                  require('postcss-cssnext')({ features: { autoprefixer: false }}),
                  require('autoprefixer')({ remove: false })
                ]
              }
            }
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
      disable: true
    })
  ],
  node: {
    fs: 'empty'
  },
  bail: false,
  devtool: 'inline-source-map'
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
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
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
