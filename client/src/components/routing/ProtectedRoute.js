import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';

const ProtectedRoute = ({ component: Component, location, match, ...rest }) => {
  const { user, isLoading } = useAuth0();
  const userRole = user && user['http://demozero.net/roles'][0];
  const isAdmin = userRole === 'admin';


  return (
    <Route
      render={(props) =>
        !isLoading && !isAdmin ? (
          <Redirect to='/games' />)
          : props.token != '' ?
            (<Component {...props} {...rest} />)
            : (
              <img src={Spinner} />
            )
      }
    />
  );
};

export default ProtectedRoute;
