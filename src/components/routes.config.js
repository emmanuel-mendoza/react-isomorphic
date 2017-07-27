import React from 'react';
import { Route, Switch, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppContainer from './appcontainer';
import Home from './home';

/* eslint-disable no-shadow */

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

// Retrieves all routes to be rendered by matching URL
/* eslint-disable no-unused-expressions, no-extra-boolean-cast */
export const matchRoutes = (url, routes, switched = false) => {
  const matchedRoutes = [];

  // The matching process
  const matchUrl = (route) => {
    const matched = matchPath(url, { path: route.path, exact: route.exact });

    if (!!matched) {
      // Add the params to matched route
      matchedRoutes.push({ ...route, params: matched.params });

      // Getting the matched children routes.
      if (route.routes) {
        // Once the switched flag is set to true, it is propagated to the children to
        // simulate the `<Switch>` component.
        matchedRoutes[matchedRoutes.length - 1].routes =
          matchRoutes(url, route.routes, switched || route.switched);
      }
    }

    return !!matched;
  };

  // We use `some` to simulate the `<Switch>` component and return only the
  // first route matched and `filter` to simulate routes not enclosed by
  // `<Switch>`component and return all matched routes.
  (switched) ? routes.some(matchUrl) : routes.filter(matchUrl);

  return matchedRoutes;
};
/* eslint-enable no-unused-expressions, no-extra-boolean-cast */

// Retieves an array of components extracted from provided routes structure.
export const flattenRoutes = (routes) => (
  routes.reduce((flattenedRoutes, route) => (
    flattenedRoutes.concat({ component: route.component, params: route.params },
      (route.routes) ? flattenRoutes(route.routes) : [])
  ), [])
);

// Retieves an array of unique components extracted from provided routes structure.
export const getComponentsFromRoutes = (routes) => (
  [...new Set(flattenRoutes(routes))]
);

// Returns the route components to be rendered.
const renderRoutes = (routes, { ...rest }) => (
  routes.filter((route) => (route.render)).map((route, i) => (
    <Route
      key={i}
      exact={route.exact}
      strict={route.strict}
      path={route.path}
      render={(props) => (
        <route.component {...rest} {...props} switched={route.switched} routes={route.routes} />
      )}
    />
  ))
);

// rendering the routes using the route configuration.
const Routes = ({ switched, routes, ...rest }) => (
  (switched) ? <Switch>{renderRoutes(routes, { ...rest })}</Switch>
             : <span>{renderRoutes(routes, { ...rest })}</span>
);

Routes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    switched: PropTypes.bool,
    render: PropTypes.bool,
    component: PropTypes.element.isRequired
  })).isRequired,
  switched: PropTypes.bool
};

Routes.defaultProps = {
  exact: false,
  switched: false,
  render: true
};

export default Routes;
