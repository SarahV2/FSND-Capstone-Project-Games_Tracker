import React, {useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';

const PrivateRoute = ({ component: Component,location, match, ...rest }) => {
  const { user, isLoading } = useAuth0();

  const userRole = user && user['http://demozero.net/roles'][0];
  const isGamer = userRole == 'gamer';

  return (
    <Route
      render={(props) =>
        !isLoading&& !isGamer ? (
          <Redirect to='/' />
        ) :
        props.token!=''? 
        (
          <Component {...props} {...rest} />
        ) 
        : (<img src={Spinner} />)
      }
    />
  );
};


export default PrivateRoute;
