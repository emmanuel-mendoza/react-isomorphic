import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import routes from '../components/routes';
import configureStore from '../store';

const store = configureStore(window.__INITIAL_STATE__.todos);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);

// HMR
if (module.hot) {
  module.hot.accept();
}
