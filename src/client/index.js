import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import Routes, { routes } from '../components/routes.config';
import configureStore from '../store';
import history from '../history';
import ReduxDevTools from '../components/reduxDevTools';

const store = configureStore(window.__INITIAL_STATE__.todos, history);
const target = document.getElementById('react-view');

render(
  <Provider store={store}>
    <Router history={history}>
      <Routes routes={routes} />
    </Router>
  </Provider>,
  target
);

// Redux Dev Tools is only needed in the client so it is rendered in another node
// so that it does not break the SSR.
if (process.env.REDUX_DEV_TOOLS) {
  render(
    <Provider store={store}>
      <ReduxDevTools />
    </Provider>,
    target.parentNode.insertBefore(document.createElement('div'), target.nextSibling)
  );
}

// HMR
if (module.hot) {
  module.hot.accept();
}
