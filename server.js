import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// HMR - Starts
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from './webpack.config';
// HMR - Ends
import apimgr from './src/infra/api-manager';
import routesmgr from './src/infra/route-manager';

const app = express();
// app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// We use the API middleware first as we are not hot reloading it.
app.use(apimgr);

// HMR - Starts
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  quiet: false,
  publicPath: config[0].output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler.compilers.find((compiler) => compiler.name === 'client'), {
  log: () => {}
}));
app.use(webpackHotServerMiddleware(compiler, {
  chunkName: 'server'
}));
// HMR - Ends

// app.use(routesmgr);

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
