import React        from 'react';
import { render }   from 'react-dom';
import { Router, browserHistory }          from 'react-router';
import { Provider } from 'react-redux';

import routes from '../components/routes';
import store, { history } from '../store';

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('react-view')
)