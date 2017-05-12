import React from 'react';
import { Route } from 'react-router-dom';

import AppContainer from './appcontainer';
import App from './app';

// routes to be used when matching request url in server side
export const routes = [
  { name: 'app', path: '/', component: App }
];

// only routes are defined so it can be used by both server and client
export default () => (
  <Route exact path="/" component={AppContainer} />
);
