// eslint-disable-next-line no-unused-vars
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes, { routes, matchRoutes, getComponentsFromRoutes } from '../components/routes.config';
import configureStore from '../store';
import history from '../history';
import Html from '../components/html';

// Promises to gather all the data and dispatch it.
const fetchComponentData = (dispatch, components) => {
  console.log(`Fetching data needed for components ${JSON.stringify(components)}`);
  const test = () => (1);
  const requests = components
    .reduce((actions, component) => {
      if (component.component) {
        // Handle `connect`ed components and getting the action
        const needs = component.component.WrappedComponent ? component.component.WrappedComponent.needs : component.component.needs;
        // If component needs an action then it is added.
        if (needs) return actions.concat(needs.map((need) => (dispatch(need(component.params))) ));
      }
      return actions;
    }, []);

  return Promise.all(requests);
};

const isTruthy = (val) => !!val;

const getTypeByChunkName = (name, assetsByChunkName, assetType) => {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.filter(asset => new RegExp(`\\.${assetType}$`).test(asset));
};

const getCss = (assetsByChunkName) => (
  getTypeByChunkName('client', assetsByChunkName, 'css').filter(isTruthy)
);

const getJs = (assetsByChunkName) => (
  getTypeByChunkName('vendor', assetsByChunkName, 'js').filter(isTruthy).concat(
    getTypeByChunkName('client', assetsByChunkName, 'js').filter(isTruthy)
  )
);

const render = (location, store, stats) => {
  // Rendering the main markup (the server counter-part of /client/index.js)
  let context={};
  const markup = renderToString(
    <Provider store={store}>
      <Router location={location} context={context}>
        <Routes routes={routes} />
      </Router>
    </Provider>
  );

  // Getting the assets
  const css = getCss(stats.assetsByChunkName);
  const js = getJs(stats.assetsByChunkName);
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

  return (req, res, next) => {
    console.log('URL: ', req.url, ' Date: ', Date.now());

    //TO-DO: Remove this
    if (req.url === '/favicon.ico') return;

    // matching the request url against the routes
    const match = matchRoutes(req.url, routes);

    // if no route matched the url, return a 404 Not Found
    if (!match) {
      res.status(404).send('Not Found');
      return;
    }

    const store = configureStore(undefined, history);  
    fetchComponentData(store.dispatch, getComponentsFromRoutes(match))
      .then((val) => {
        // TO-DO: Need to research how to handle re-direction
        //if (context.url) res.redirect(301, context.url);
        
        const html = render(req.url, store, {assetsByChunkName});
        res.status(200).send(`<!doctype html>${html}`);
    })
    .catch((err) => res.end(err.message));

    return;
  }
};

export default router;
