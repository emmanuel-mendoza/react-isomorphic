// eslint-disable-next-line no-unused-vars
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes, { routes } from '../components/routes';
import configureStore from '../store';
import history from '../history';
import Html from '../views';

// Promises to gather all the data and dispatch it.
const fetchComponentData = (dispatch, components, params) => {
  console.log('Fetching data needed for components');

  const requests = components
    // Filtering undefined components
    .filter(component => component)
    // Handle `connect`ed components
    .map(component => component.WrappedComponent ? component.WrappedComponent : component)
    // Get only the components that need data injection
    .filter(component => component.needs)
    // Flattering the array of arrays of actions
    .reduce((previous, current) => previous.concat(current.needs), [])
    // Dispatching actions
    .map(action => dispatch(action(params)));

  return Promise.all(requests);
};

function isTruthy(val) {
  return !!val;
};

function getCssByChunkName(name, assetsByChunkName) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.css$/.test(asset));
};

function getCss(assetsByChunkName) {
  return [getCssByChunkName('client', assetsByChunkName)].filter(isTruthy);
};

const router = (stats) => {
  const assetsByChunkName = stats.clientStats.assetsByChunkName;
  const css = getCss(assetsByChunkName);

  return (req, res, next) => {
    console.log('URL: ', req.url, ' Date: ', Date.now());
    console.log(JSON.stringify(css));

    // matching the request url against the routes
    const match = routes.find((route) => matchPath(req.url, route.path, {extact: true}));

    // if no route matched the url, return a 404 Not Found
    if (!match) {
      res.status(404).send('Not Found');
      return;
    }

    const store = configureStore(undefined, history);  
    fetchComponentData(store.dispatch, [match.component], match.params)
      .then((val) => {
        const context = {};
        const markup = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <Routes />
            </StaticRouter>
          </Provider>
        );

        // Request needs to be redirected if context.url is defined
        if (context.url) {
          res.redirect(301, context.url);
        // Send rendered matched route with data to client
      } else {
          const html = Html(store.getState(), css, markup);
          console.log(html);
          res.status(200).send(html);
        }
    })
    .catch((err) => res.end(err.message));

    return;
  }
};

export default router;
