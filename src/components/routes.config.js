import React from 'react';
import { Route, Switch, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppContainer from './appcontainer';
import Home from './home';


// route configuration
export const routes = [
  {
    name: 'appContainer',
    path: '/',
    exact: true,
    render: true,
    component: AppContainer,
    routes: [
      {
        name: 'home',
        path: '/',
        exact: true,
        render: true,
        component: Home
      }
    ]
  }
];

// match routes aginst provided url
export const matchRoutes = (url) => {
  let matchedRoute;
  // eslint-disable-next-line no-shadow
  const match = (routes) => (
    // We use `some` to simulate the `<Switch>` component and return only the
    // first route matched.
    routes.some((route) => {
      let matched = !!matchPath(url, { path: route.path, exact: route.exact });
      console.log(`Match between ${url} and ${route.path} is ${JSON.stringify(matched)}`);
      if (matched) {
        matchedRoute = route;
      } else if (route.routes) {
        matched = match(route.routes);
      }
      return matched;
    })
  );

  match(routes);
  return matchedRoute;
};


// rendering the routes using the route configuration.
// eslint-disable-next-line no-shadow
const Routes = ({ routes, ...rest }) => (
  <Switch>
    {routes.filter((route) => (route.render)).map((route, i) => (
      <Route
        key={i}
        exact={route.exact}
        strict={route.strict}
        path={route.path}
        render={(props) => (<route.component {...rest} {...props} routes={route.routes} />)}
      />
    ))}
  </Switch>
);

export default Routes;

Routes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    render: PropTypes.bool
  })).isRequired
};
