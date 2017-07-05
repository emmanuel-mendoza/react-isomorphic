const webpack = require('webpack');
const fs = require('fs');

const server = (SRC_DIR, DIST_DIR) => ({
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
      'process.env.BROWSER': false,
      'process.env.REDUX_DEV_TOOLS': false
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
});

module.exports = server;
