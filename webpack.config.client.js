const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const client = (SRC_DIR, DIST_DIR) => ({
  name: 'client',
  context: SRC_DIR,
  entry: {
    client: ['react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/index'] },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
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
      'process.env.BROWSER': true,
      'process.env.REDUX_DEV_TOOLS': false
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
      disable: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    })
  ],
  node: {
    fs: 'empty'
  },
  bail: false,
  devtool: 'inline-source-map'
});

module.exports = client;
