import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// HMR - Starts
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.server.config';
// HMR - Ends
import apimgr from './src/infra/api-manager';
import routermgr from './src/infra/route-manager';

const app = express();

// Setting Express to use EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// We use the API middleware first as we are not hot reloading it.
app.use(apimgr);

// HMR - Starts
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  quiet: false,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
  log: () => {}
}));
// HMR - Ends

app.use(routermgr);

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
