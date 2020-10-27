import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { utilityHelper } from '../_helpers';

const AdminRoute = ({ component, exact = false, path, authenticated, allowuser }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated && utilityHelper.inArray(utilityHelper.getUserInfo().role, allowuser) ? (
        
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}
  />
);

const { object, bool, string, func } = PropTypes;

AdminRoute.propTypes = {
  component: func.isRequired,
  exact: bool,
  path: string.isRequired,
  authenticated: bool.isRequired,
  location: object
};

export { AdminRoute };