import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userRole = user && user['http://demozero.net/roles'][0];
  console.log(userRole);

  return (
    <Route
      render={(props) =>
        !isAuthenticated && !isLoading ? (
          <Redirect to='/games' />
        ) : props.tokenValue != '' ? (
          <Component {...props} {...rest} />
        ) : (
          <img src={Spinner} />
        )
      }
    />
  );
};

export default PrivateRoute;
