// eslint-disable-next-line no-unused-vars
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
// import createMemoryHistory from 'history/createMemoryHistory'
import routes from '../components/routes';
import store from '../store';

// Promises to gather all the data and dispatch it.
const fetchComponentData = (dispatch, components, params) => {
  console.log('Fetching data needed for components');

  let requests = components
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

const router = (stats) => (req, res, next) => {
  // const location = createMemoryHistory(req.url).location;
  console.log('URL: ', req.url, ' Date: ', Date.now());

  // react-router will manage the routes
  match({ routes, location: req.url }, (error, redirect, props) => {
    if (error) {
      // there was an error somewhere during route matching
      res.status(500).end(`Internal server error\n\n${error.message}`);
    } else if (redirect) {
      // Before a route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // if we got props then we matched a route and can render
      console.log('Dispatching');
      fetchComponentData(store.dispatch, props.components, props.params)
        .then((val) => {
          console.log('Rendering: ', val);
          // `RouterContext` is what the `Router` renders. `Router` keeps these `props`
          // in its state as it listens to `browserHistory`. But on the server our app
          // is stateless, so we need to use `match` to get these props before rendering.
          const markup = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );

          // Passing the initial state
          const initialState = store.getState();

          console.log('Store state: ', initialState);
          res.render('index', { markup, initialState });

          return true;
        })
        .catch((err) => res.end(err.message));
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found');
    }

    return true;
  });
};

export default router;
