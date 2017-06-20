// eslint-disable-next-line no-unused-vars
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes, { routes } from '../components/routes';
import configureStore from '../store';
import history from '../history';
import Html from '../components/html';

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

const render = (location, store, stats) => {
  // Rendering the main markup (the server counter-part of /client/index.js)
  let context={};
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  // Getting the assets
  const css = getCss(stats.assetsByChunkName);
  const js=["bundle.js"];
  const initialState = store.getState();

  return renderToStaticMarkup(
    <Html
      js={js}
      css={css}
      html={markup}
      initialState={initialState}
    />
  );
};

const router = (stats) => {
  const assetsByChunkName = stats.clientStats.assetsByChunkName;
  //const css = getCss(assetsByChunkName);

  return (req, res, next) => {
    console.log('URL: ', req.url, ' Date: ', Date.now());

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
        // TO-DO: Need to research how to handle re-direction
        //if (context.url) res.redirect(301, context.url);
        
        //const html = Html(store.getState(), css, markup);
        const html=render(req.url, store, {assetsByChunkName});
        res.status(200).send(`<!doctype html>${html}`);
    })
    .catch((err) => res.end(err.message));

    return;
  }
};

export default router;
